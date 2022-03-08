const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users.js')

router.get('/', usersCtrl.getUser)

router.post('/signup', usersCtrl.create)
router.post('/login',usersCtrl.login)
//protected routes
router.use(require('../../config/auth'))
router.post('/setup',usersCtrl.setup)
router.get('/allmessages', usersCtrl.getAllMessages)
router.post('/sendmessage', usersCtrl.createMessage)
router.post('/startconvo', usersCtrl.createConvo)
router.get('/recieve/message', usersCtrl.recieveMessage)

router.post('/save', usersCtrl.saveOne)
router.post('/like', usersCtrl.likeOne)
router.post('/edit', usersCtrl.editProfile)

module.exports = router;