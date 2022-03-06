const ProjectModel = require('../../models/Project.js')
const UserModel = require('../../models/User.js')

module.exports = {
    projectsIndex,
    projectsFlag,
    projectsTag,
    projectsRef,
    projectsUser,
<<<<<<< HEAD
    projectsSaved
=======
    createProject,
    createComment,
>>>>>>> master
}

async function projectsIndex(req, res) {
    try {
        let projects = await ProjectModel.find({}).populate('author')
        res.status(200).json(projects)
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsUser(req, res) {
    try {
        let name = req.get("user")
        if (name) {
            let user = await UserModel.findOne({ username: name })
            console.log(user)
            let projects = await ProjectModel.find({ author: [user._id] }).populate('author')
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
            let projects = await ProjectModel.find({}).populate('author')
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
            let projects = await ProjectModel.find({ tag: tag }).populate('author')
            res.status(200).json(projects)
        } else {
            let projects = await ProjectModel.find({}).populate('author')
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
            let projects = await ProjectModel.find({ author: [userId] }).sort({"viewCount": -1}).limit(3).populate('author')
            res.status(200).json(projects)
        } else {
            let projects = await ProjectModel.find({}).populate('author')
            res.status(200).json(projects)
        }
    } catch(err) {
        res.status(400).json(err)
    }
}

async function projectsSaved(req, res) {
    try {
        let userId = req.get("user")
        let user = await UserModel.findOne({ name: [userId] })
        let idArr = user.likedPosts
        // let savedProjects = []
        // let one = await ProjectModel.find({_id: idArr[0]}).populate('author')
        // console.log("fweagfweFGWEGGWRG", one) 
        // above return [{}]
        // idArr.forEach(async function(id) {
        //     let p = await ProjectModel.find({_id:id}).populate('author')
        //     console.log( "fadfafeggggggggggggggg", p)
        //     savedProjects.push(p)
        // }
        // )

        let savedProjects = idArr.map(async id => await ProjectModel.find({_id:id}).populate('author'))
        res.status(200).json(savedProjects)
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
        let project = await ProjectModel.findById( req.body.projectId )
        let newCom = {
            user: req.body.userId,
            text: req.body.comment,
            date: new Date(),
            likeCount: 0
        }
        project.comment.push(newCom)
        project.save()
        res.status(200).json(project);
    } catch(err) {
        res.status(400).json(err)
    }
}

