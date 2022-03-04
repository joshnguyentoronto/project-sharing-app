const express = require('express')
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects')

router.get('/', projectsCtrl.projectsIndex)
router.get('/flag', projectsCtrl.projectsFlag)
router.get('/tag', projectsCtrl.projectsTag)
router.get('/ref', projectsCtrl.projectsRef)

module.exports = router;