const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLinkSchema = new Schema({
    name: String,
    url: String,
}, {
    timestamps: true
})

const userSchema = new Schema({
  name: String,
  username: String,
  email: String,
  avatar: String,
  bio: String,
  location: String,
  skill: Array,
  education: Array,
  experiences: Array,
  userLink: [userLinkSchema],
  conversations: [{type: Schema.Types.ObjectId, ref: 'Conversation'}],
  savedPosts: Array,
  likedPosts: Array   
}, {
  timestamps: true
});

let UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;