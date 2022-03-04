const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    sender: String,
    recipient: String,
    date: Date,
}, {
    timestamps: true
})
const conversationSchema = new Schema({
    user1: String,
    user2: String,
    messages: [messageSchema]
}, {
    timestamps: true
})



let ConversationModel = mongoose.model('Conversation', conversationSchema);
module.exports = ConversationModel;