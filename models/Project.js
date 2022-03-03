const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  author: [{type: Schema.Types.ObjectId, ref: 'User'}],  
  title: String,
  date: Date,
  viewCount: Number,
  likeCount: Number,
  text: [textSchema],
  projectLink: [projectLinkSchema],
  comment: [commentSchema],
  flag: String,
  tag: Array
}, {
  timestamps: true
});

const textSchema = new Schema({
    heading: String,
    text: String,
}, {
    timestamps: true
})

const projectLinkSchema = new Schema({
    name: String,
    url: String,
}, {
    timestamps: true
})

const commentSchema = new Schema({
  user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  test: String,
  date: Date,
  like: Number, 
}, {
  timestamps: true
})

let ProjectModel = mongoose.model('Project', projectSchema);
module.exports = ProjectModel;