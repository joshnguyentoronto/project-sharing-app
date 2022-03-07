const ConversationModel = require('../../models/Conversation')
const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = {
    create,
    login,
    setup,
    saveOne,
    likeOne,
    getAllMessages,
    getUser,
    createMessage
}

async function createMessage(req,res){
    let conversation = await ConversationModel.findById(req.body.convoId)
    let recipient =''
    if (req.body.users[0]._id == req.user._id){
        recipient = req.body.users[1]._id
    } else {
        recipient = req.body.users[0]._id
    }
    let newMessage = {
        text: req.body.text,
        sender: req.user._id,
        recipient: recipient,
        date: new Date() 
    }
    conversation.messages.push(newMessage)
    conversation.save()
    console.log(conversation)
    res.status(200).json(JSON.stringify(conversation))
}

async function getAllMessages(req,res){
    let conversations = await ConversationModel.find({users: req.user._id}).populate('users')
    res.status(200).json(JSON.stringify(conversations))
}

async function getUser(req,res){
    try {
        let userId = req.get('userId')
        const user = await UserModel.findById(userId)
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function setup(req,res){
    console.log(req.user)
    console.log(req.body)
    try {
        let user = await UserModel.findById(req.user._id)
        user.location = req.body.location,
        user.education =req.body.education,
        user.bio = req.body.bio
        user.save()
        res.status(200).json()     
    } catch(err){
        res.status(400).json(err)
    }
}

async function create(req,res){
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS))
        const user = await UserModel.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const token = jwt.sign({user}, process.env.SECRET, { expiresIn: '24h' })
        res.status(200).json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function login(req,res){
    try {
        const user = await UserModel.findOne({username: req.body.username})
        if (!(await bcrypt.compare(req.body.password, user.password))) throw new Error();

        const token = jwt.sign({user}, process.env.SECRET, {expiresIn: '24h'})
        res.status(200).json(token)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function saveOne(req, res) {
    try {
        let user = await UserModel.findById(req.body.userId)
        if (user.savedPosts.some(s => s === req.body.savedPosts)) {
            let index = user.savedPosts.indexOf(req.body.savedPosts)
            user.savedPosts.splice(index, 1)
            user.save()
        } else {
            user.savedPosts.push(req.body.savedPosts)
            user.save()
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function likeOne(req, res) {
    try {
        let user = await UserModel.findById(req.body.userId)
        if (user.likedPosts.some(l => l === req.body.likedPosts)) {
            let index = user.likedPosts.indexOf(req.body.likedPosts)
            user.likedPosts.splice(index, 1)
            user.save()
        } else {
            user.likedPosts.push(req.body.likedPosts)
            user.save()
        }

        res.status(200).json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}