// const io = require('socket.io')()

 
//  // Listen for new connections from clients (socket)
// io.on('connection', function (socket) {
//     console.log('Client connected to socket.io!');

//     socket.on('setup', function(userData){
//       socket.join(userData._id)
//       console.log(userData._id)
//       socket.emit('connected')
//       // io.emit('add-message', data)
//     })

//     socket.on('join chat', (room) => {
//       socket.join(room)
//       console.log('User joined room: ' + room)
//     })

//     socket.on('new message', (convoObj) => {
//       if (convoObj.length < 1) return console.log("Chat users not defined")

//       convoObj.users.forEach(user => {
//         if(user._id == convoObj.messages[convoObj.messages.length -1].sender._id) return
//         socket.in(user._id).emit("message recived", convoObj)
//       })

//     })
//   });
  
//   module.exports = io;
  

  // io represents socket.io on the server - let's export it