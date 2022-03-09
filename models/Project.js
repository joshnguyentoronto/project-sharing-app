const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const textSchema = new Schema({
    index: Number,
    heading: String,
    text: String,
}, {
    timestamps: true
})

const projectLinkSchema = new Schema({
    index: Number,
    name: String,
    url: String,
}, {
    timestamps: true
})

const commentSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  likedUser: Array,
  text: String,
  date: Date,
  likeCount: Number,
}, {
  timestamps: true
})

const projectSchema = new Schema({
  author: [{type: Schema.Types.ObjectId, ref: 'User'}],  
  title: String,
  date: {type: Date, default: new Date()},
  viewCount: {type: Number, default: 0},
  likeCount: {type: Number, default: 0},
  text: [textSchema],
  projectLink: [projectLinkSchema],
  comment: [commentSchema],
  flag: String,
  tag: Array,
  images: Array,
}, {
  timestamps: true
});


let ProjectModel = mongoose.model('Project', projectSchema);
module.exports = ProjectModel;