const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    sender: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    recipient: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: Date,
}, {
    timestamps: true
})
const conversationSchema = new Schema({
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    messages: [messageSchema],
    lastMessage: String,  
}, {
    timestamps: true
})

let ConversationModel = mongoose.model('Conversation', conversationSchema);

module.exports = ConversationModel