const labController = require('../controllers/labController')
const tokenController = require('../utils/tokenController')
const imgUpload = require('../middleware/imgUpload')
const ActImgController = require('../controllers/lab/actImgController')
const NewsController = require('../controllers/lab/newsController')
const AwardsController = require('../controllers/lab/awardsController.js')
const MembersController = require('../controllers/lab/membersController')
const ResearchController = require('../controllers/lab/researchController')

const router = require('express').Router()

router.get("/home", labController.home)

//actImg
router.post('/actImg/add', imgUpload, ActImgController.addImg)
router.get('/actImg/show', ActImgController.showImg)
router.get('/actImg/update/:id', imgUpload, ActImgController.updateImg)
router.get('/actImg/delete/:id', ActImgController.deleteImg)

//news
router.post('/news/add', imgUpload, NewsController.addNews)
router.get('/news/show', NewsController.showNews)
router.put('/news/update/:id', imgUpload, NewsController.updateNews)
router.delete('/news/delete/:id', NewsController.deleteNews)

//awards
router.post('/awards/add', imgUpload, AwardsController.addAward)
router.get('/awards/show', AwardsController.showAwards)
router.put('/awards/update/:id', imgUpload, AwardsController.updateAwards)
router.delete('/awards/delete/:id', AwardsController.deleteAward)


//members
router.post('/members/addmember', imgUpload, MembersController.addMember)
router.get('/members/show', MembersController.showMembers)
router.put('/members/update/:id', imgUpload, MembersController.updateMember)
router.delete('/members/delete/:id', MembersController.deleteMember)

//research
router.post('/research/addresearch', imgUpload, ResearchController.addResearch)
router.get('/research/show/', ResearchController.showResearch)
router.put('/research/update/:id', imgUpload, ResearchController.updateResearch)
router.delete('/research/delete/:id', ResearchController.deleteResearch)


module.exports = router