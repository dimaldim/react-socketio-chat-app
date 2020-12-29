const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const { addMessage, getChannelMessages } = require('./messages');
const { channels, addUserToChannel, removeUserFromChannel } = require('./channels');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});

const PORT = 8080;

io.on('connection', (socket) => {
    const { currentChannel } = socket.handshake.query;
    console.log(`${socket.id} has connected to channel ${currentChannel}`);
    socket.join(currentChannel);

    socket.on('CHANNEL_JOIN', (channelName) => {
        addUserToChannel(socket.id, channelName);
        io.in(channelName).emit('CHANNEL_JOINED', channels);
        const welcomeMsg = addMessage(channelName, {body: socket.id + ' has joined the channel'}, 'System');
        io.in(channelName).emit('NEW_MESSAGE', welcomeMsg);
    });

    socket.on('NEW_MESSAGE', (data) => {
        const { body, user } = data;
        const msg = addMessage(currentChannel, data);

        io.in(currentChannel).emit('NEW_MESSAGE', msg);
    });

    socket.on('CHANNEL_LEFT', () => {
        removeUserFromChannel(socket.id);
        io.emit('CHANNEL_LEFT', channels);
    })


    socket.on('disconnect', () => {
        removeUserFromChannel(socket.id);
        io.emit('CHANNEL_LEFT', channels);
        console.log(`${socket.id} has disconnected`);
        socket.leave(currentChannel);
    });
});

app.get('/channels/:channel/messages', (req, res) => {
    const allMessages = getChannelMessages(req.params.channel);

    return res.json({ allMessages });
});

app.get('/getChannels', (req, res) => {

    return res.json({ channels });
});

server.listen(PORT, () => console.log(`Server listening to port ${PORT}`));