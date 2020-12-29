const http = require('http');
const express = require('express');
const cors = require('cors');
const socketIO = require('socket.io');
const { addMessage, getChannelMessages } = require('./messages');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});

const PORT = 8080;

const channels = [
    {
        id: 1,
        name: 'general',
        users: 0,
    }
];

io.on('connection', (socket) => {
    const { channelName } = socket.handshake.query;
    console.log(`${socket.id} has connected to channel ${channelName}`);

    socket.on('CHANNEL_JOIN', (channelName) => {
        const [channelData] = channels.filter((channel) => channel.name === channelName);
        if(channelData) {
            channelData.users++;
        }
    });


    socket.on('disconnect', () => console.log(`${socket.id} has disconnected`));
});

app.get('/channels/:channel/messages', (req, res) => {
    const allMessages = getChannelMessages(req.params.channel);

    return res.json({ allMessages });
});

app.get('/getChannels', (req, res) => {

    return res.json({ channels });
});

server.listen(PORT, () => console.log(`Server listening to port ${PORT}`));