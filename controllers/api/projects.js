const ProjectModel = require('../../models/Project.js')
const UserModel = require('../../models/User.js')

module.exports = {
    projectsIndex,
    projectsFlag,
    projectsTag,
    projectsRef,
    projectsUser,
    projectsSaved,
    projectsLiked,
    createProject,
    createComment,
    deleteComment,
    likeComment,
    unlikeComment,
}

async function projectsIndex(req, res) {
    try {
        let projects = await ProjectModel.find({}).populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        res.status(200).json(projects)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsUser(req, res) {
    try {
        let userId = req.get("user")
        if (userId) {
            let projects = await ProjectModel.find({ author: [userId] }).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(projects)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsFlag(req, res) {
    try {
        let flag = req.get("flag")
        if (flag) {
            let projects = await ProjectModel.find({ flag: flag })
            res.status(200).json(projects)
        } else {
            let projects = await ProjectModel.find({}).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(projects)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsTag(req, res) {
    try {
        let tag = req.get("tag")
        if (tag) {
            let projects = await ProjectModel.find({ tag: tag }).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(projects)
        } else {
            let projects = await ProjectModel.find({}).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(projects)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsRef(req, res) {
    try {
        let userId = req.get("user")
        if (userId) {
            let projects = await ProjectModel.find({ author: [userId] }).sort({"viewCount": -1}).limit(3).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(projects)
        } else {
            let projects = await ProjectModel.find({}).populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(projects)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsSaved(req, res) {
    try {
        let userId = req.get("user")
        let user = await UserModel.findById(userId)
        let idArr = user.savedPosts
        let projects = await ProjectModel.find({ _id: { $in: idArr } }).populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        console.log(projects)
        res.status(200).json(projects)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsLiked(req, res) {
    try {
        let userId = req.get("user")
        let user = await UserModel.findById(userId)
        let idArr = user.likedPosts
        let projects = await ProjectModel.find({ _id: { $in: idArr } }).populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        console.log(projects)
        res.status(200).json(projects)
    } catch(err) {
        res.status(400).json(err)
    }
}


async function createProject(req, res) {
    try {
        const newProject = await ProjectModel.create(req.body)
        res.status(200).json(newProject);
    } catch(err) {
        res.status(400).json(err)
    }
}

async function createComment(req, res) {
    try {
        let newProject = await ProjectModel.findById( req.body.projectId )
        let newCom = {
            user: req.body.userId,
            likeUser: [],
            text: req.body.comment,
            date: new Date(),
            likeCount: 0
        }
        newProject.comment.push(newCom)
        newProject.save()
        let project = await newProject.populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        res.status(200).json(project);
    } catch(err) {
        res.status(400).json(err)
    }
}

async function deleteComment(req, res) {
    try {
        let newProject = await ProjectModel.findById( req.body.projectId )
        newProject.comment.remove({ _id: req.body.commentId })
        newProject.save()
        if (newProject.comment.length) {
            let project = await newProject.populate([
                { path: 'author', model: 'User' },
                { path: 'comment', populate: { path: 'user', model: 'User' } }
            ])
            res.status(200).json(project);
        } else {
            let project = await newProject.populate('author')
            res.status(200).json(project);
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function likeComment(req, res) {
    try {
        let newProject = await ProjectModel.findById( req.body.projectId )
        let index = await newProject.comment.findIndex(com => com._id == req.body.commentId)
        await newProject.comment[index].likedUser.push(req.body.userId)
        newProject.comment[index].likeCount = newProject.comment[index].likeCount + 1;
        await newProject.save()
        let project = await newProject.populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        res.status(200).json(project);
    } catch(err) {
        res.status(400).json(err)
    }
}


async function unlikeComment(req, res) {
    try {
        let newProject = await ProjectModel.findById( req.body.projectId )
        let index = await newProject.comment.findIndex(com => com._id == req.body.commentId)
        await newProject.comment[index].likedUser.splice( newProject.comment[index].likedUser.indexOf( req.body.userId ), 1 )
        newProject.comment[index].likeCount = newProject.comment[index].likeCount - 1;
        await newProject.save()
        let project = await newProject.populate([
            { path: 'author', model: 'User' },
            { path: 'comment', populate: { path: 'user', model: 'User' } }
        ])
        res.status(200).json(project);
    } catch(err) {
        res.status(400).json(err)
    }
}