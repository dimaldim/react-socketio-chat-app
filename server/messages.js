const uuid = require("uuid");
const messages = [];

const addMessage = (channel, message, user) => {
  const data = { id: uuid.v4(), channel, user, ...message };
  messages.push(data);

  return data;
};

const getChannelMessages = (channel) =>
  messages.filter((message) => message.channel === channel);

module.exports = { addMessage, getChannelMessages };
