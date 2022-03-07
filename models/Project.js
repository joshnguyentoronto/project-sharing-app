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
  text: String,
  date: Date,
  likeCount: Number,
}, {
  timestamps: true
})

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


let ProjectModel = mongoose.model('Project', projectSchema);
module.exports = ProjectModel;