import { useState } from "react";
import useSocket from "../../hooks/socket";
import "./Chat.scss";

function Chat({ nickname }) {
  const [message, setMessage] = useState("");
  const { channels, messages, setCurrentChannel, sendMessage } = useSocket(nickname);

  const handleNewMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    sendMessage(message);
    setMessage('');
  }

  return (
    <div className="chat-app">
      <div className="channel-list">
        {channels.length ? (
          channels.map((channel) => {
            return (
              <div
                onClick={() => setCurrentChannel(channel.name)}
                className="channel-item"
                key={channel.id}
              >
                <div>#{channel.name}</div>
                <span>{channel.users}</span>
              </div>
            );
          })
        ) : (
          <div className="no-content-message">No channels available</div>
        )}
      </div>

      <div className="messages-panel">
        <div className="messages-list">
          {messages.length &&
            messages.map((message) => {
              return (
                <div className="message-item" key={message.id}>
                  <div>
                    <b>{message.user}</b>
                  </div>
                  <span>{message.body}</span>
                </div>
              );
            })}
        </div>

        <div className="messages-input">
          <input
            onChange={handleNewMessageChange}
            value={message}
            placeholder="Type message..."
            type="text"
          />
          <button onClick={handleMessageSubmit}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
