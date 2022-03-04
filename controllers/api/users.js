const UserModel = require('../../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


module.exports = {
    create,
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