const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = {
    create,
    login,
    setup,
    saveOne,
    likeOne
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
        cc
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
        // console.log(req.user)
        let user = await UserModel.findById(req.body.userId)
        if (user.savedPosts.some(s => s === req.body.savedPosts)) {
            user.savedPosts.delete(req.body.savedPosts)
            user.save()
        } else {
            user.savedPosts.push(req.body.savedPosts)
            user.save()
            console.log(req.user)
        }
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function likeOne(req, res) {
    try {
        console.log(req.user)
        let user = await UserModel.findById(req.body.userId)
        user.likedPosts.push(req.body.likedPosts)
        user.save()
        res.status(200).json(user)
    } catch(err) {
        res.status(400).json(err)
    }
}