import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000';

// export socket and open the connection to server right away, which we don't need
export const socket = io(URL);

// export socket but not open the connection to server 
// export const socket = io(URL, {
//     autoConnect: false
// });
// call socket.connect() to make the socket client connect
// socket.connect()
