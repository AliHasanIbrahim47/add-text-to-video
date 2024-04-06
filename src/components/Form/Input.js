import { useState } from 'react';

import classes from './Input.module.css';
import Button from '../UI/Button';

const Input = ({ setTextOptions }) => {

  const [text, setText] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [duration, setDuration] = useState(5);
  const [startTime, setStartTime] = useState(0);

  const handleApplyOptions = () => {
    setTextOptions({ text, fontSize, xPosition, yPosition, duration, startTime });
    console.log("Options is set");
  };

  return (
    <form className={classes['form-control']}>

      <div>
        <label htmlFor="txt">Text to Add</label>
        <input
          onChange={(event) => setText(event.target.value)}
          value={text}
          type="text"
          id="txt"
        />
      </div>

      <div>
        <label htmlFor="xPosition">Starting X Position</label>
        <input
          onChange={(e) => setXPosition(Number(e.target.value))}
          value={xPosition}
          type="number"
          id="xPosition"
        />
      </div>

      <div>
        <label htmlFor="yPosition">Starting Y Position</label>
        <input
          onChange={(e) => setYPosition(Number(e.target.value))}
          value={yPosition}
          type="number"
          id="yPosition"
        />
      </div>

      <div>
        <label htmlFor="duration">Duration</label>
        <input
          onChange={(e) => setDuration(Number(e.target.value))}
          value={duration}
          type="number"
          id="duration"
        />
      </div>

      <div>
        <label htmlFor="startTime">Start Time</label>
        <input
          onChange={(e) => setStartTime(Number(e.target.value))}
          value={startTime}
          type="number"
          id="startTime"
        />
      </div>

      <div>
        <label htmlFor="fontSize">Font Size</label>
        <input
          onChange={(e) => setFontSize(Number(e.target.value))}
          value={fontSize}
          type="number"
          id="fontSize"
        />
      </div>

      <div classes={classes['control-group']}>
        <Button className={classes.customButton} onClick={handleApplyOptions}> Apply Text Options </Button>
      </div>
    </form>
  );
};

export default Input;
