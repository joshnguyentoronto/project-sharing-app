const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLinkSchema = new Schema({
    name: String,
    url: String,
}, {
    timestamps: true
})

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  about: String,
  avatar: String,
  bio: String,
  location: String,
  skill: Array,
  education: Array,
  experiences: Array,
  userLink: [userLinkSchema],
  conversations: Array,
  savedPosts: [{type: Schema.Types.ObjectId, ref: 'Project'}],
  likedPosts: [{type: Schema.Types.ObjectId, ref: 'Project'}]   
}, {
  timestamps: true
});

let UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;