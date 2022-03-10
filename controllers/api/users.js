const ConversationModel = require('../../models/Conversation')
const ProjectModel = require('../../models/Project.js')
const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { CoPresentSharp } = require('@mui/icons-material');


module.exports = {
    create,
    login,
    setup,
    saveOne,
    likeOne,
    likeOneProfile,
    getAllMessages,
    getUser,
    getAll,
    getAllByUserName,
    createMessage,
    createConvo,
    recieveMessage,
    editProfile
}

async function recieveMessage(req,res){
    console.log(req.body)
    let conversation = await ConversationModel.findById(req.body.convoId)
}

async function createConvo(req,res){
    let conversation = await ConversationModel.find({users: [req.user._id, req.body.recipient]})
    if (conversation.length == 1){
        let newMessage = {
            text: req.body.text,
            sender: req.user._id,
            recipient: req.body.recipient,
            date: new Date() 
        }
        conversation[0].messages.push(newMessage)
        conversation[0].save()
        res.status(200).json()
    } else{
        try {
            ConversationModel.create({
                users: [
                    req.user._id,
                    req.body.recipient,
                ],
                messages: [{
                    text: req.body.text,
                    sender: req.user._id,
                    recipient: req.body.recipient,
                    date: new Date ()
                }]
            })
            res.status(200).json()
        } catch(err){
            res.status(400).json(err)
        }
    }
}

async function createMessage(req,res){
    let conversation = await ConversationModel.findById(req.body.convoId)
    let recipient =''
    console.log(req.body)
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

async function getAll(req,res){
    try {
        const users = await UserModel.find({}).select('username email _id');
        res.status(200).json(users)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function getAllByUserName(req,res){
    try {
        const users = await UserModel.find({ username: { $in: req.body.users } }).select('_id');
        res.status(200).json(users)
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
        let project = await ProjectModel.findById(req.body.likedPosts)
        console.log(project)
        let user = await UserModel.findById(req.body.userId)
        if (user.likedPosts.some(l => l === req.body.likedPosts)) {
            let index = user.likedPosts.indexOf(req.body.likedPosts)
            user.likedPosts.splice(index, 1)
            await user.save()
            project.likeCount = project.likeCount - 1
            await project.save()
        } else {
            user.likedPosts.push(req.body.likedPosts)
            await user.save()
            project.likeCount = project.likeCount + 1
            await project.save()
        }
        let projects = await ProjectModel.find({}).populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        await project.populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        const object = {
            user: user,
            newProject: project,
            projectsList: projects
        }
        res.status(200).json(object)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function likeOneProfile(req, res) {
    try {
        let project = await ProjectModel.findById(req.body.likedPosts)
        let user = await UserModel.findById(req.body.userId)
        if (user.likedPosts.some(l => l === req.body.likedPosts)) {
            let index = user.likedPosts.indexOf(req.body.likedPosts)
            user.likedPosts.splice(index, 1)
            await user.save()
            project.likeCount = project.likeCount - 1
            await project.save()
        } else {
            user.likedPosts.push(req.body.likedPosts)
            await user.save()
            project.likeCount = project.likeCount + 1
            await project.save()
        }
        await project.populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        if (req.body.cat == 'Liked') {
            let idArr = user.likedPosts
            let projects = await ProjectModel.find({ _id: { $in: idArr } }).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            let object = {
                user: user,
                newProject: project,
                projectsList: projects
            }
            res.status(200).json(object)
        } else if (req.body.cat == 'Saved') {
            let idArr = user.savedPosts
            let projects = await ProjectModel.find({ _id: { $in: idArr } }).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            let object = {
                user: user,
                newProject: project,
                projectsList: projects
            }
            res.status(200).json(object)
        } else if (req.body.otherUser) {
            let projects = await ProjectModel.find({ author: [req.body.otherUser] }).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            let object = {
                user: user,
                newProject: project,
                projectsList: projects
            }
            res.status(200).json(object)
        } else if (req.body.cat == 'Projects') {
            let projects = await ProjectModel.find({ author: [req.body.userId] }).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            let object = {
                user: user,
                newProject: project,
                projectsList: projects
            }
            res.status(200).json(object)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function editProfile(req, res) {
    try {
        let userId = req.get('userId')
        let user = await UserModel.findById(userId)
        console.log("before save", user)
        console.log(req.body)
        user.name = req.body.name
        user.bio = req.body.bio
        user.education = req.body.education
        user.experiences = req.body.experiences
        user.location = req.body.location
        user.skill = req.body.skill
        user.userLink = req.body.userLink
        user.save()
        console.log("afterr save", user)
        res.status(200).json(user)
    }catch(err) {
        res.status(400).json(err)
    }
}