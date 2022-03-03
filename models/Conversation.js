const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    user1: [{type: Schema.Types.ObjectId, ref: 'User'}],
    user2: [{type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [messageSchema]
}, {
    timestamps: true
})

const messageSchema = new Schema({
    text: String,
    sender: [{type: Schema.Types.ObjectId, ref: 'User'}],
    recipient: [{type: Schema.Types.ObjectId, ref: 'User'}],
    date: Date,
}, {
    timestamps: true
})


let ConversationModel = mongoose.model('Conversation', conversationSchema);
module.exports = ConversationModel;