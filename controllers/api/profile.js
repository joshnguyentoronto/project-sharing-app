const UserModel = require('../../models/User.js')


module.exports = {
    profileIndex,
}

async function profileIndex(req, res) {
    try {
        let projects = await ProjectModel.find({}).populate('author')
        res.status(200).json(projects)
    } catch(err) {
        res.status(400).json(err)
    }
}