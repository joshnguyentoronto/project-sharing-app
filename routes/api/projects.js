const express = require('express')
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects')

router.get('/', projectsCtrl.projectsIndex)
router.get('/user', projectsCtrl.projectsUser)
router.get('/flag', projectsCtrl.projectsFlag)
router.get('/tag', projectsCtrl.projectsTag)
router.get('/ref', projectsCtrl.projectsRef)

router.post('/new', projectsCtrl.createProject)
router.post('/comment', projectsCtrl.createComment)

module.exports = router;