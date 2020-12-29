const uuid = require('uuid');
const messages = [];

const addMessage = (channel, message) => {
    const data = { id: uuid.v4(), channel, ...message };
    messages.push(data);

    return data;
}

const getChannelMessages = (channel) => {
    messages.filter((message) => message.channel === channel);
}

module.exports = { addMessage, getChannelMessages };