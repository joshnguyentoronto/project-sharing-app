const ProjectModel = require('../../models/Project.js')

module.exports = {
    projectsIndex,
}

async function projectsIndex(req, res) {
    try {
        let projects = await ProjectModel.find({}).populate('author')
        projects.forEach(pro => {
            let authors = await pro.author.map(obj => {
                obj = obj.name
            })
            pro.author = authors
        })
        console.log(projects)
        res.status(200).json(projects)
    } catch(err) {
        res.status(400).json(err)
    }
}