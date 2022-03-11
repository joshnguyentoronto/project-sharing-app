
require('dotenv').config();
require('./config/database');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const UserModel = require('./models/User');
const ProjectModel = require('./models/Project');
const ConversationModel = require('./models/Conversation');

async function populateDB() {

    await UserModel.deleteMany({})
    

    await ConversationModel.deleteMany({})
    

    await ProjectModel.deleteMany({})
    
    
    process.exit();

};

populateDB()