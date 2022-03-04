
require('dotenv').config();
require('./config/database');

const UserModel = require('./models/User');
const ProjectModel = require('./models/Project');
const ConversationModel = require('./models/Conversation');

async function populateDB() {

    await UserModel.deleteMany({})
    const newUser = await UserModel.create([
        {
            name: 'Josh',
            username: 'Lu',
            email: 'janusshan@gmail.com',
            avatar: 'lala',
            bio: 'Hello, this is test account, feel free to do whatever you want',
            Location: 'Toronto, Ontario',
            skill: ["HTML", "CSS", "JavaScript"],
            education: [
                { school: "Humber College", major: "Hospitality" },
                { school: "UoT", major: "Computer Science" }
            ],
            experiences: [
                { company: "Scotia Bank", title: "banker" },
                { company: "La La", title: "Ba Ba Ba" }
            ],
            userLink: [
                { name: "Github", url: "www.google.com" },
                { name: "linkedIn", url: "www.google.com" },
                { name: "Portfolio", url: "www.google.com" }
            ],
            savedPosts: ["postID", "postID"],
            likedPosts: ["postID", "postID"],
        }
    ])

    await ProjectModel.deleteMany({})
    const newProjects = await ProjectModel.create([
        {
            author: [],
            title: "Fake title number 1",
            date: 2022/03/03,
            viewCount: 103,
            likeCount: 231,
            text: [
                { heading: "this is heading 1", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 2", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 3", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 4", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" }
            ],
            projectLink: [
                { name: "Github", url: "www.google.com" },
                { name: "linkedIn", url: "www.google.com" },
                { name: "Portfolio", url: "www.google.com" }
            ],
            comment: [
                { user: "userID here", text: "this is text inside the comment", date: 2022/03/03, likeCount: 12 }
            ],
            flag: "UX/UI design",
            tag: [ "HTML", "CSS", "Python", "Django" ]
        },
        {
            author: [],
            title: "Fake title number 2",
            date: 2022/03/03,
            viewCount: 103,
            likeCount: 231,
            text: [
                { heading: "this is heading 1", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 2", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 3", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 4", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" }
            ],
            projectLink: [
                { name: "Github", url: "www.google.com" },
                { name: "linkedIn", url: "www.google.com" },
                { name: "Portfolio", url: "www.google.com" }
            ],
            comment: [
                { user: "userID here", text: "this is text inside the comment", date: 2022/03/03, likeCount: 12 }
            ],
            flag: "UX/UI design",
            tag: [ "HTML", "CSS", "Python", "Django" ]
        },
        {
            author: [],
            title: "Fake title number 3",
            date: 2022/03/03,
            viewCount: 103,
            likeCount: 231,
            text: [
                { heading: "this is heading 1", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 2", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 3", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" },
                { heading: "this is heading 4", text: "agh a sgaslg a gha;sdgahg ah ashga hgah  hg hgh agha; h;adhg;l ahg;ha ;gh;ah gah ;" }
            ],
            projectLink: [
                { name: "Github", url: "www.google.com" },
                { name: "linkedIn", url: "www.google.com" },
                { name: "Portfolio", url: "www.google.com" }
            ],
            comment: [
                { user: "userID here", text: "this is text inside the comment", date: 2022/03/03, likeCount: 12 }
            ],
            flag: "UX/UI design",
            tag: [ "HTML", "CSS", "Python", "Django" ]
        },
    ])

    await ConversationModel.deleteMany({})

    process.exit();

};

populateDB()