import "./index.css";
import "./App.css";
import Chat from "./components/Chat/Chat";
import { useState } from "react";

function App() {
  const [nickname, setNickname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value.trim());
  };

  const handleNicknameSubmit = () => {
    if (!nickname.length) return;

    setLoggedIn(true);
  };

  return (
    <div className="main-div">
      {!loggedIn ? (
        <div className="login-container">
          <input
            className="text-input-field"
            onChange={handleNicknameChange}
            placeholder="Enter nickname..."
            type="text"
          />
          <button className="login-button" onClick={handleNicknameSubmit}>
            Login
          </button>
        </div>
      ) : (
        <Chat nickname={nickname} />
      )}
    </div>
  );
}

export default App;
