module.exports = app =>{
    const userController = require('../controllers/userController')
    const router = require('express').Router()

    router.post("/", userController.create)
    //router.get("/", userController.findAll)

    router.get("/:id", userController.findOne)
    router.put("/:id", userController.update)
    router.delete("/:id", userController.delete)
    router.delete("/", userController.deleteAll)

    app.use('/api/user',router)
}