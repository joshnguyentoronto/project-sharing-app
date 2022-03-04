const User = require('../../models/User');

module.exports = {
    create,
}

async function create(req,res){
    console.log('hi')
    console.log(req.body)
}