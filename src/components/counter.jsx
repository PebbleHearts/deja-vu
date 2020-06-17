import React, { useEffect, useState } from 'react'

import './styles.css';

const Counter = (props) => {
  const timeAvailable = (props.mins * 60) + props.secs;
  const [seconds, setSeconds] = useState(timeAvailable);

  useEffect(() => {
    let interval = null;
    if (props.startCounter && seconds !== 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!props.startCounter && seconds !== 0) {
      clearInterval(interval);
    } else if (seconds === 0) {
      props.handleGameEnding();
    }
    return () => clearInterval(interval);
  }, [props.startCounter, seconds]);

  return (
    <div className="counter">
      <span className="mins">{Math.floor(seconds / 60)}</span> min <span className="secs">{seconds % 60}</span> sec
    </div>
  );
}

export default Counter;
