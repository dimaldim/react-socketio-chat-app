import "./index.css";
import "./App.css";
import { useState } from "react";
import Chat from "./components/Chat/Chat";
import LoginDialog from "./components/LoginDialog";

function App() {
  const [nickname, setNickname] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value.trim());
  };

  const handleNicknameSubmit = (e) => {
    if (!nickname.length) return;

    e.preventDefault();

    setLoggedIn(true);
  };

  return (
    <div className="main-div">
      {!loggedIn ? (
        <LoginDialog
          nicknameChange={handleNicknameChange}
          nicknameSubmit={handleNicknameSubmit}
        />
      ) : (
        <Chat nickname={nickname} />
      )}
    </div>
  );
}

export default App;
