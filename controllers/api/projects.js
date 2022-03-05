const ProjectModel = require('../../models/Project.js')

module.exports = {
    projectsIndex,
    projectsFlag,
    projectsTag,
    projectsRef,
}

async function projectsIndex(req, res) {
    try {
        let projects = await ProjectModel.find({}).populate('author')
        res.status(200).json(projects)
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