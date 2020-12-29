
import './Chat.scss';

function Chat({ channelList }) {
  
    return (
      <div className="chat-app">

        <div className="channel-list">
          {channelList.length ?
            channelList.map((channel) => {
            
            return (<div className="channel-item" key={channel.id}>
              <div>#{channel.name}</div>
              <span>{channel.users}</span>
            </div>)
            }) : (<div className="no-content-message">No channels available</div>)}
        </div>
          
          <div className="messages-panel">
            <div className="messages-list">
              <div className="message-item">
                <div><b>User</b></div>
                <span>Text</span>
              </div>
            </div>

            <div className="messages-input">
              <input type="text" />
              <button>Send</button>
            </div>
          </div>
      </div>
      );
}

export default Chat;