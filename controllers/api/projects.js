const ProjectModel = require('../../models/Project.js')

module.exports = {
    projectsIndex,
}

async function projectsIndex(req, res) {
    try {
        let flag = req.get("flag")
        let tag = req.get("tag")
        if (flag) {
            let projects = await ProjectModel.find({ flag: flag }).populate('author')
            res.status(200).json(projects)
        } else if (tag) {
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