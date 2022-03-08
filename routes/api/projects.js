const express = require('express')
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects')

router.get('/', projectsCtrl.projectsIndex)
router.get('/user', projectsCtrl.projectsUser)
router.get('/flag', projectsCtrl.projectsFlag)
router.get('/tag', projectsCtrl.projectsTag)
router.get('/ref', projectsCtrl.projectsRef)
router.get('/saved', projectsCtrl.projectsSaved)
router.get('/liked', projectsCtrl.projectsLiked)

router.post('/new', projectsCtrl.createProject)
router.post('/comment/new', projectsCtrl.createComment)
router.post('/comment/delete', projectsCtrl.deleteComment)

module.exports = router;