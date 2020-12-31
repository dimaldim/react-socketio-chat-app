function ChatMessages({ messagesLoading, messages }) {
  return (
    <ul className="chat-messages">
      {messagesLoading ? (
        <li className="message">
          <span>Loading messages...</span>
        </li>
      ) : (
        messages.map((message) => {
          return (
            <li className="message" key={message.id}>
              <div>
                <span className="user-id">{message.user}</span>
                <span>{message.body}</span>
              </div>
              <span className="message-time">
                {new Date(message.time).toLocaleTimeString()}
              </span>
            </li>
          );
        })
      )}
    </ul>
  );
}

export default ChatMessages;
