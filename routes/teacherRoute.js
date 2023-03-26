const TokenController = require('../middleware/tokenController')
const imgUpload = require('../middleware/imgUpload')
const educationController = require('../controllers/teacher/educationController')
const researchController = require('../controllers/teacher/researchExperienceController')
const articlesController = require('../controllers/teacher/articlesController')
const talksController = require('../controllers/teacher/talksController')
const conferenceController = require('../controllers/teacher/conferenceController')
const teacherAwards = require('../controllers/teacher/teacherAwardsController')
const serviceController = require('../controllers/teacher/serviceController')
const serviceEventController = require('../controllers/teacher/serviceController')


const router = require('express').Router()

//education
router.post('/education',TokenController.verifyToken, educationController.addEducation )
router.get('/education', educationController.showEducation)
router.put('/education/:id',TokenController.verifyToken, educationController.updateEducation)
router.delete('/education/:id',TokenController.verifyToken, educationController.deleteEducation)

//researchExperience
router.post('/researchExperience',TokenController.verifyToken, researchController.addResearchExperience )
router.get('/researchExperience', researchController.showResearchExperience)
router.put('/researchExperience/:id',TokenController.verifyToken, researchController.updateResearchExperience)
router.delete('/researchExperience/:id',TokenController.verifyToken, researchController.deleteResearchExperience)

//articles
router.post('/articles',TokenController.verifyToken, articlesController.addArticles )
router.get('/articles', articlesController.showArticles)
router.put('/articles/:id',TokenController.verifyToken, articlesController.updateArticles)
router.delete('/articles/:id',TokenController.verifyToken, articlesController.deleteArticles)

//talks
router.post('/talks',TokenController.verifyToken, talksController.addTalks )
router.get('/talks', talksController.showTalks)
router.put('/talks/:id',TokenController.verifyToken, talksController.updateTalks)
router.delete('/talks/:id',TokenController.verifyToken, talksController.deleteTalks)

//conference
router.post('/conference',TokenController.verifyToken, conferenceController.addConference )
router.get('/conference', conferenceController.showConference)
router.put('/conference/:id',TokenController.verifyToken, conferenceController.updateConference)
router.delete('/conference/:id',TokenController.verifyToken, conferenceController.deleteConference)

//teacherAwards
router.post('/teacherAwards', TokenController.verifyToken, teacherAwards.addTeacherAwards)
router.get('/teacherAwards', teacherAwards.showTeacherAwards)
router.put('/teacherAwards/:id',TokenController.verifyToken, teacherAwards.updateTeacherAwards)
router.delete('/teacherAwards/:id',TokenController.verifyToken, teacherAwards.deleteTeacherAwards)


//service
router.post('/service', TokenController.verifyToken, serviceController.addService)
router.get('/service', serviceController.showService)
router.put('/service/:id', TokenController.verifyToken, serviceController.updateService)
router.delete('/service/:id', TokenController.verifyToken, serviceController.deleteService)

module.exports = router