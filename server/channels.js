const channels = [
  {
    id: 1,
    name: "general",
    users: 0,
    activeConnections: [],
  },
  {
    id: 2,
    name: "test",
    users: 0,
    activeConnections: [],
  },
];

const addUserToChannel = (socketId, channelName) => {
  const [channel] = channels.filter((c) => c.name === channelName);

  if (channel) {
    channel.users++;
    channel.activeConnections.push(socketId);
  }
};

const removeUserFromChannel = (socketId) => {
  const [userChannel] = channels.filter(
    (channel) => channel.activeConnections.indexOf(socketId) !== -1
  );

  if (userChannel) {
    const connectionIndex = userChannel.activeConnections.indexOf(socketId);
    userChannel.activeConnections.splice(connectionIndex, 1);
    userChannel.users--;
  }
};

module.exports = { channels, addUserToChannel, removeUserFromChannel };
