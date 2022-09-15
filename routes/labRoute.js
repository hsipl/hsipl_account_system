const TokenController = require('../utils/tokenController')
const imgUpload = require('../middleware/imgUpload')
const EventController = require('../controllers/lab/eventImgController')
const NewsController = require('../controllers/lab/newsController')
const AwardsController = require('../controllers/lab/awardsController.js')
const MembersController = require('../controllers/lab/membersController')
const ResearchController = require('../controllers/lab/researchController')
const ProjectsController = require('../controllers/lab/projectsController')
const PostersController = require('../controllers/lab/postersController')
const EquipmentController = require('../controllers/lab/equipmentController') 

const router = require('express').Router()



//eventImg
router.post('/eventImg',TokenController.verifyToken, imgUpload, EventController.addImg )
router.get('/eventImg', EventController.showImg)
router.put('/eventImg/:id',TokenController.verifyToken, imgUpload, EventController.updateImg)
router.delete('/eventImg/:id',TokenController.verifyToken, EventController.deleteImg)

//news
router.post('/news',TokenController.verifyToken, imgUpload, NewsController.addNews)
router.get('/news', NewsController.showNews)
router.put('/news/:id',TokenController.verifyToken, imgUpload, NewsController.updateNews)
router.delete('/news/:id',TokenController.verifyToken, NewsController.deleteNews)

//awards
router.post('/awards',TokenController.verifyToken, imgUpload, AwardsController.addAward)
router.get('/awards', AwardsController.showAwards)
router.put('/awards/:id',TokenController.verifyToken, imgUpload, AwardsController.updateAwards)
router.delete('/awards/:id',TokenController.verifyToken, AwardsController.deleteAward)


//members
router.post('/members',TokenController.verifyToken, imgUpload, MembersController.addMember)
router.get('/members', MembersController.showMembers)
router.put('/members/:id',TokenController.verifyToken, imgUpload, MembersController.updateMember)
router.delete('/members/:id',TokenController.verifyToken, MembersController.deleteMember)

//research
router.post('/research',TokenController.verifyToken, imgUpload, ResearchController.addResearch)
router.get('/research', ResearchController.showResearch)
router.put('/research/:id',TokenController.verifyToken, imgUpload, ResearchController.updateResearch)
router.delete('/research/:id',TokenController.verifyToken, ResearchController.deleteResearch)

//projects

router.post('/projects', TokenController.verifyToken, imgUpload, ProjectsController.addProject)
router.get('/projects', ProjectsController.showProject)
router.put('/projects/:id', TokenController.verifyToken, imgUpload, ProjectsController.updateProject)
router.delete('/projects/:id', TokenController.verifyToken, ProjectsController.deleteProject)

//posters

router.post('/posters', TokenController.verifyToken, imgUpload, PostersController.addPoster)
router.get('/posters', PostersController.showPosters)
router.put('/posters/:id', TokenController.verifyToken, imgUpload, PostersController.updatePoster)
router.delete('/posters/:id', TokenController.verifyToken, PostersController.deletePoster)

//equipment
router.post('/equipment', TokenController.verifyToken, imgUpload, EquipmentController.addEquipment)
router.get('/equipment', EquipmentController.showEquipment)
router.put('/equipment/:id', TokenController.verifyToken, imgUpload, EquipmentController.updateEquipment)
router.delete('/equipment/:id', TokenController.verifyToken, EquipmentController.deleteEquipment)

module.exports = router