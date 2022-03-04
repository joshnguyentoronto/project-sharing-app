const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLinkSchema = new Schema({
    name: String,
    url: String,
}, {
    timestamps: true
})

const userSchema = new Schema({
  name: {type: String, required: true},
  username: {type:String, required:true},
  email: {
    type:String,
    unique:true,
    trim: true,
    lowercase:true, 
    required:true
  },
  password: {
    type: String,
    trim: true,
    minlength: 7,
    required: true,
  },
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
  timestamps: true,
  toJSON: {
    transform: function(doc, ret){
      delete ret.password;
      return ret 
    }
  }
});

let UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;