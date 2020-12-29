import io from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SOCKET_URL = "http://localhost:8080";

function useSocket(nickname) {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentChannel, setCurrentChannel] = useState("general");
  const [channels, setChannels] = useState([]);

  const IORef = useRef();

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get(`${SOCKET_URL}/getChannels`);
      const channels = response.data.channels;

      setChannels(channels);
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get(
        `${SOCKET_URL}/channels/${currentChannel}/messages`
      );
      const messages = response.data.allMessages;

      setMessages(messages);
    };

    fetchChannels();
  }, [currentChannel]);

  useEffect(() => {
    IORef.current = io(SOCKET_URL, {
      query: { currentChannel, nickname },
    });

    IORef.current.on("connect", () => console.log(`Connected`));
    IORef.current.emit("CHANNEL_JOIN", currentChannel);

    IORef.current.on("CHANNEL_JOINED", (data) => {
      setChannels(data);
    });

    IORef.current.on("CHANNEL_LEFT", (data) => {
      setChannels(data);
    });

    IORef.current.on("NEW_MESSAGE", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      IORef.current.disconnect();
    };
  }, [currentChannel]);

  const sendMessage = (body) => {
      if(!IORef.current) {
          return;
      }

      IORef.current.emit('NEW_MESSAGE', {
          body: body,
          user: 'Test',
      });
  }

  return {
    messages,
    users,
    channels,
    setCurrentChannel,
    sendMessage,
  };
}

export default useSocket;
