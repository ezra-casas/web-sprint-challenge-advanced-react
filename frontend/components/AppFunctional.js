import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function AppFunctional(props) {

  const [steps, setSteps] = useState(0);
  const [coordinate, setCoordinate] = useState({x: 2, y: 2});
  const [moveError, setMoveError] = useState('');
  const [email, setEmail] = useState('');

  const moveUp = () => {
    (coordinate.y > 1) ? 
    (setCoordinate({...coordinate, y: coordinate.y - 1}), 
    setSteps(steps + 1), setMoveError('')) 
    : setMoveError("You can't go up")
  }
  const moveDown = () => {
    coordinate.y < 3 ? 
    (setCoordinate({...coordinate, y: coordinate.y + 1}), 
    setSteps(steps + 1), setMoveError('')) 
    : setMoveError("You can't go down"); 
  }
  const moveLeft = () => {
    coordinate.x > 1 ? 
    (setCoordinate({...coordinate, x: coordinate.x - 1}), 
    setSteps(steps + 1), setMoveError('')) 
    : setMoveError("You can't go left");
  }
  const moveRight = () => {
    coordinate.x < 3 ? 
    (setCoordinate({...coordinate, x: coordinate.x + 1}), 
    setSteps(steps + 1), setMoveError(''))
    : setMoveError("You can't move right");
  }
  const resetHandler = () => {
    setCoordinate({x: 2, y: 2});
    setSteps(0);
    setMoveError('');
    setEmail('');
  }
  const onChange = event => {
    const {value} = event.target
    setEmail(value);
  }

  const onSubmit = event => {
    event.preventDefault();

    const newSubmission = {
      x: coordinate.x,
      y: coordinate.y,
      steps: steps,
      email: email,
    };
    axios.post('http://localhost:9000/api/result', newSubmission)
    .then(response => {
      setMoveError(response.data.message);
      setEmail(email);
    })
    .catch(error => setMoveError(error.response.data.message))
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{`Coordinates (${coordinate.x},${coordinate.y})`}</h3>
        <h3 id="steps">You moved {steps} {steps === 1 ? "time" : "times"}</h3>
      </div>
      <div id="grid">
        <div className={coordinate.x === 1 && coordinate.y === 1 ? 'square active': 'square'}>
            { coordinate.x === 1 & coordinate.y === 1 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 2 && coordinate.y === 1 ? 'square active': 'square' }>
            { coordinate.x === 2 & coordinate.y === 1 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 3 && coordinate.y === 1 ? 'square active': 'square' }>
            { coordinate.x === 3 & coordinate.y === 1 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 1 && coordinate.y === 2 ? 'square active': 'square' }>
            { coordinate.x === 1 & coordinate.y === 2 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 2 && coordinate.y === 2 ? 'square active': 'square' }>
            { coordinate.x === 2 & coordinate.y === 2 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 3 && coordinate.y === 2 ? 'square active': 'square' }>
            { coordinate.x === 3 & coordinate.y === 2 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 1 && coordinate.y === 3 ? 'square active': 'square' }>
            { coordinate.x === 1 & coordinate.y === 3 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 2 && coordinate.y === 3 ? 'square active': 'square' }>
            { coordinate.x === 2 & coordinate.y === 3 ? 'B': '' }
          </div>
          <div className={ coordinate.x === 3 && coordinate.y === 3 ? 'square active': 'square' }>
            { coordinate.x === 3 & coordinate.y === 3 ? 'B': '' } 
        </div>
      </div>
      <div className="info">
        <h3 id="message">{moveError}</h3>
      </div>
      <div id="keypad">
        <button onClick={moveLeft} id="left">LEFT</button>
        <button onClick={moveUp} id="up">UP</button>
        <button onClick={moveRight} id="right">RIGHT</button>
        <button onClick={moveDown} id="down">DOWN</button>
        <button onClick={resetHandler} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          value={email}
          onChange={onChange}
          type="email"
          placeholder='example@example.com'>
        </input>
        <input
          id='submit'
          type="submit">
        </input>
      </form>
    </div>
  )
}
