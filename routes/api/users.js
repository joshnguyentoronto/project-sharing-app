const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/api/users.js')

router.get('/', usersCtrl.getUser) 
router.get('/all', usersCtrl.getAll)
router.post('/allbyusername', usersCtrl.getAllByUserName)
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
router.post('/profile/data', usersCtrl.getProfileData)
router.post('/update/images', usersCtrl.updatePhoto)
router.post('/like/profile', usersCtrl.likeOneProfile)

module.exports = router;