const express = require('express')
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects')

router.get('/', projectsCtrl.projectsIndex)
router.get('/user', projectsCtrl.projectsUser)
router.get('/flag', projectsCtrl.projectsFlag)
router.get('/tag', projectsCtrl.projectsTag)
router.get('/ref', projectsCtrl.projectsRef)
router.get('/saved', projectsCtrl.projectsSaved)

module.exports = router;