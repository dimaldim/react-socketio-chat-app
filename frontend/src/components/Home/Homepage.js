
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    const [channel, setChannel] = useState('');

    const handlechannelChange = (event) => {
      setChannel(event.target.value);
    };

    return (
        <div className="container">
        <input
          type="text"
          placeholder="Room"
          value={channel}
          onChange={handlechannelChange}
          className="text-input-field"
        />
        <Link to={`/${channel}`} className="enter-room-button">
          Join room
        </Link>
      </div>
    );
}

export default Homepage