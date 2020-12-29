import io from 'socket.io-client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const SOCKET_URL = 'http://localhost:8080';

function useSocket(channelName) {
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [channels, setChannels] = useState([]);

    const IORef = useRef();


    // useEffect(() => {
    //     IORef.current = io(SOCKET_URL, {
    //         query: { channelName },
    //     });

    //     IORef.current.on('connect', () => console.log(`Connected to backend, ID -> ${IORef.current.id}`));

    //     IORef.current.emit('CHANNEL_JOIN', channelName);

    //     IORef.current.on('channel', (data) => {
    //         const allChannels = [...channels];
    //         const channel = allChannels.filter((channel) => channel.name === data.name);
    //         console.log(allChannels);
    //         if(channel) {
    //             channel.users = data.users;
    //         }

    //         // setChannels(allChannels);
    //     });

    //     return () => {
    //         IORef.current.disconnect();

    //     }
    // }, [channelName]);

    useEffect(() => {
        IORef.current = io(SOCKET_URL, {
            query: { channelName },
        });

        IORef.current.on('connect', () => console.log(`Connected`));
        IORef.current.emit('CHANNEL_JOIN', channelName);

        return () => {
            IORef.current.disconnect();
        }

    }, [channelName]);

    useEffect(() => {
        const fetchChannels = async () => {
            const response = await axios.get(`${SOCKET_URL}/getChannels`);
            const channels = response.data.channels;

            setChannels(channels);
        };

        fetchChannels();
    }, [channelName]);


    return {
        messages,
        users,
        channels
    }
}

export default useSocket;