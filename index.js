const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  // options object
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());

const PORT = process.env.PORT || 5500;

// Create first route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Socket IO
io.on('connection', (socket) => {
  // Callback function that provides socket
  socket.emit('me', socket.id); // Emitting event to the client

  socket.on('disconnect', () => {
    socket.broadcast.emit('callEnded');
  });

  // Socket handlers
  socket.on('callUser', ({ userToCall, signalData, from, name }) => {
    // Pass data from frontend
    io.to(userToCall).emit('callUser', { signal: signalData, from, name });
  });

  socket.on('answerCall', (data) => {
    // Receive data
    io.to(data.to).emit('callAccepted', data.signal);
  });
});

// Listen on port
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
