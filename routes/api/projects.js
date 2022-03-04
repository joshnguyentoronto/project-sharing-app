const express = require('express')
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects')

router.get('/', projectsCtrl.projectsIndex)

module.exports = router;