const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users.js')

router.post('/signup', usersCtrl.create)
router.post('/login',usersCtrl.login)
//protected routes
router.use(require('../../config/auth'))
router.post('/setup',usersCtrl.setup)
router.get('/allmessages', usersCtrl.getAllMessages)
router.post('/sendmessage', usersCtrl.createMessage)

router.post('/save', usersCtrl.saveOne)
router.post('/like', usersCtrl.likeOne)

module.exports = router;