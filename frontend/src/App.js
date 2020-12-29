import "./index.css";
import Chat from './components/Chat/Chat';
import useSocket from "./service/socket";
import { useState } from "react";

function App() {
  const [channel, setChannel] = useState('general');
  const { channels } = useSocket(channel);

  return (
    <Chat channelList={channels} />
  )
}

export default App;
