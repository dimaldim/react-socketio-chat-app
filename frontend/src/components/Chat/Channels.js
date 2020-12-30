import { useState } from "react";

function Channels({
  nickname,
  channelsLoading,
  channels,
  channel,
  setChannel,
}) {
  const [showChannelsModal, setShowChannelsModal] = useState(false);

  return (
    <aside className="sidebar left-sidebar">
      <div className="user-profile">
        <span className="username">@ {nickname}</span>
      </div>
      <div className="channels">
        <ul className="chat-channels">
          {channelsLoading ? (
            <li>
              <span className="channel-name">Loading channels....</span>
            </li>
          ) : channels.length ? (
            channels.map((c) => {
              return (
                <li
                  key={c.id}
                  onClick={() => setChannel(c.name)}
                  className={c.name === channel ? "active" : ""}
                >
                  <span className="channel-name">{c.name}</span>
                </li>
              );
            })
          ) : (
            <li>
              <span className="channel-name">No channels available</span>
            </li>
          )}
        </ul>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setShowChannelsModal(true)}
            className="button-primary"
          >
            Join channel
          </button>
        </div> */}
      </div>
      {showChannelsModal ? (
        <div className="dialog-container">
          <div className="dialog">Choose channels to join in:</div>
        </div>
      ) : null}
    </aside>
  );
}

export default Channels;
