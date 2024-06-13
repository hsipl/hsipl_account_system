const request = require('supertest')
const express = require('express')
const userController = require('../../controllers/userController')
const db = require('../../models')
const errorHandler = require('../../middleware/errorHandler')
const TokenController = require('../../middleware/tokenController')
const SessionIdController = require('../../middleware/sessionIdController')
const { encrypt, decrypt } = require('../../utils/encryptPassword')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

jest.mock('../../models')
jest.mock('../../middleware/errorHandler')
jest.mock('../../middleware/tokenController')
jest.mock('../../middleware/sessionIdController')
jest.mock('../../utils/encryptPassword')
jest.mock('nodemailer')
jest.mock('jsonwebtoken')

const app = express()
app.use(express.json())
app.post('/user/create', userController.createUser)
app.post('/user/login', userController.login)
app.get('/user/findUser', userController.findUser)
app.delete('/user/deleteUser/:id', userController.deleteUser)
app.get('/user/userOptionSearch', userController.userOptionSearch)
app.post('/user/forgetPassword', userController.forgetPassword)
app.post('/user/resetPassword', userController.resetPassword)

describe('userController', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('createUser', () => {
    test('should create a new user', async () => {
      db.User.findOne.mockResolvedValue(null)
      encrypt.mockResolvedValue('encryptedPassword')
      db.User.create.mockResolvedValue({})

      const res = await request(app)
        .post('/user/create')
        .send({
          name: 'John Doe',
          username: 'johndoe',
          password: 'password123',
          mail: 'johndoe@example.com'
        })

      expect(res.status).toBe(200)
      expect(res.body).toEqual({
        message: 'Created John Doe sucessfully.'
      })
    })

    test('should not create user if user already exists', async () => {
      const mockUser = {
        name: 'John Doe',
        username: 'johndoe',
        password: 'password123',
        mail: 'johndoe@example.com'
      }

      db.User.findOne.mockResolvedValue(mockUser)
      errorHandler.userAlreadyExist.mockReturnValue({ message: 'User already exists' })

      const res = await request(app)
        .post('/user/create')
        .send(mockUser)

      expect(res.status).toBe(409);
      expect(res.body).toEqual({ message: 'User already exists' })
    })
  })

  describe('login', () => {
    test('should login user with correct credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        password: 'encryptedPassword',
        mail: 'johndoe@example.com'
      }

      const mockToken = 'mockToken'
      const mockSessionId = 'mockSessionId'

      db.User.findOne.mockResolvedValue(mockUser);
      decrypt.mockResolvedValue(true);
      TokenController.signToken.mockResolvedValue(mockToken);
      SessionIdController.gernerateSessionId.mockResolvedValue(mockSessionId);

      const res = await request(app)
        .post('/user/login')
        .send({ username: 'johndoe', password: 'password123' });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        message: `Login successfully! Welcome back ${mockUser.name}.`,
        accessToken: mockToken,
        sessionId: mockSessionId
      });
    });

    test('should not login user with incorrect credentials', async () => {
      const mockUser = {
        id: 1,
        name: 'John Doe',
        username: 'johndoe',
        password: 'encryptedPassword',
        mail: 'johndoe@example.com'
      };

      db.User.findOne.mockResolvedValue(mockUser)
      decrypt.mockResolvedValue(false);
      errorHandler.loginError.mockReturnValue({ message: 'Login error' })

      const res = await request(app)
        .post('/user/login')
        .send({ username: 'johndoe', password: 'wrongpassword' })

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: 'Login error' })
    })
  })
  describe('findUser', () => {
    test('should return user info if user exists', async () => {
        const mockUser = {
            name: 'John Doe',
            mail: 'johndoe@example.com',
            studentID: '12345',
            phoneNum: '1234567890',
            birthday: '1990-01-01',
            lineID: 'johnline',
            balance: 100
        };

        db.User.findOne.mockResolvedValue(mockUser)

        const res = await request(app)
            .get('/user/findUser')
            .query({ name: 'John Doe' })

        expect(res.status).toBe(200)
        expect(res.body).toEqual(mockUser)
    })

    test('should return 404 if user not found', async () => {
        db.User.findOne.mockResolvedValue(null)
        errorHandler.dataNotFind.mockReturnValue({ message: 'User not found' })

        const res = await request(app)
            .get('/user/findUser')
            .query({ name: 'Nonexistent' })

        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: 'User not found' });
    })
});
describe('deleteUser', () => {
    test('should delete user if balance is zero', async () => {
        const mockUser = { id: 1, name: 'John Doe', balance: 0 }

        db.User.findOne.mockResolvedValue(mockUser)
        db.User.destroy.mockResolvedValue(1)
        db.UserLog.create.mockResolvedValue({})

        const res = await request(app)
            .delete('/user/deleteUser/1')

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ message: 'Deleted John Doe Sucessfully!' })
    })

    test('should return 409 if balance is not zero', async () => {
        const mockUser = { id: 1, name: 'John Doe', balance: 100 }
        db.User.findOne.mockResolvedValue(mockUser)
        errorHandler.balanceNotZero.mockReturnValue({ message: 'Balance not zero' });

        const res = await request(app)
            .delete('/user/deleteUser/1')

        expect(res.status).toBe(409)
        expect(res.body).toEqual({ message: 'Balance not zero' })
    })
})
describe('userOptionSearch', () => {
    test('should return all users if query is empty', async () => {
        const mockUsers = [{ name: 'John Doe' }, { name: 'Jane Doe' }]
        db.User.findAll.mockResolvedValue(mockUsers)

        const res = await request(app)
            .get('/user/userOptionSearch')
            .query({})

        expect(res.status).toBe(200);
        expect(res.body.data).toEqual(mockUsers)
    })

    test('should return filtered users based on query', async () => {
        const mockUsers = [{ name: 'John Doe', mail: 'john@example.com' }]
        db.User.findAll.mockResolvedValue(mockUsers)

        const res = await request(app)
            .get('/user/userOptionSearch')
            .query({ name: 'John Doe', mail: 'john@example.com' })

        expect(res.status).toBe(200)
        expect(res.body.data).toEqual(mockUsers)
    })
})
describe('forgetPassword', () => {
    test('should send reset password email if user exists', async () => {
        const mockUser = { id: 1, mail: 'user@example.com' }
        db.User.findOne.mockResolvedValue(mockUser)
        TokenController.signToken.mockResolvedValue('mockToken')
        jwt.verify.mockReturnValue({ exp: Date.now() / 1000 + 60 })  // 新增這一行
        nodemailer.createTransport.mockReturnValue({
            sendMail: jest.fn().mockResolvedValue({})
        })

        const res = await request(app)
            .post('/user/forgetPassword')
            .send({ mail: 'user@example.com' })

        expect(res.status).toBe(200)
        expect(res.body).toEqual({
            message: 'Mail for reset password was sent to your mail, please check.',
            resetPasswordToken: 'mockToken'
        })
    })

    test('should return 404 if user not found', async () => {
        db.User.findOne.mockResolvedValue(null)
        errorHandler.dataNotFind.mockReturnValue({ message: 'User not found' })

        const res = await request(app)
            .post('/user/forgetPassword')
            .send({ mail: 'nonexistent@example.com' })

        expect(res.status).toBe(404)
        expect(res.body).toEqual({ message: 'User not found' })
    })
})
describe('resetPassword', () => {
    test('should reset password if token is valid', async () => {
        const mockUser = { id: 1, resetPasswordToken: 'mockToken', mail: 'user@example.com' }
        const mockToken = { id: 1, mail: 'user@example.com', exp: Date.now() / 1000 + 60 }
        db.User.findOne.mockResolvedValue(mockUser)
        jwt.verify.mockReturnValue(mockToken)
        encrypt.mockResolvedValue('encryptedNewPassword')
        nodemailer.createTransport.mockReturnValue({
            sendMail: jest.fn().mockResolvedValue({})
        })

        const res = await request(app)
            .post('/user/resetPassword')
            .query({ resetPasswordToken: 'mockToken' })
            .send({ newPassword: 'newPassword' })

        expect(res.status).toBe(200)
        expect(res.body).toEqual({ message: 'Your password was updated sucessfully.' })
    })

    test('should return 401 if token is invalid', async () => {
        db.User.findOne.mockResolvedValue(null)
        errorHandler.loginError.mockReturnValue({ message: 'Invalid token' })

        const res = await request(app)
            .post('/user/resetPassword')
            .query({ resetPasswordToken: 'invalidToken' })

        expect(res.status).toBe(401)
        expect(res.body).toEqual({ message: 'Invalid token' })
    })
})

  // 其他測試案例
})