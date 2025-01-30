import React, { useState, useEffect } from 'react';
import './App.css';

const drumPads = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function App() {
  const [displayText, setDisplayText] = useState('');

  const playSound = (pad) => {
    const audio = document.getElementById(pad.keyTrigger);
    audio.currentTime = 0;
    audio.play();
    setDisplayText(pad.id);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      const pad = drumPads.find(pad => pad.keyCode === e.keyCode);
      if (pad) {
        playSound(pad);
        const drumPad = document.getElementById(pad.id);
        drumPad.classList.add('active');
        setTimeout(() => drumPad.classList.remove('active'), 100);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div id="drum-machine">
      <div className="pad-bank">
        {drumPads.map(pad => (
          <div
            key={pad.id}
            id={pad.id}
            className="drum-pad"
            onClick={() => playSound(pad)}
          >
            {pad.keyTrigger}
            <audio
              id={pad.keyTrigger}
              className="clip"
              src={pad.url}
            />
          </div>
        ))}
      </div>
      <div id="display">{displayText}</div>
    </div>
  );
}

export default App;
