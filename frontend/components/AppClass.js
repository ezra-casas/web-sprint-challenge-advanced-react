import React from 'react';
import axios from 'axios';
const URL = "http://localhost:9000/api/result";

export default class AppClass extends React.Component {
  state = { 
    coordinate: {x: 2, y: 2}, 
    steps: 0, 
    email: "",
    moveError: ""
  }
  moveY = (key, value) => {
    key === "up" && value > 1 ? this.setState({
      ...this.state,
      y: value - 1,
      count: this.state.count + 1,
      moveError: '',
    })
    : key === "up" && value === 1 ?
    this.setState({
      ...this.state,
      moveError: "You can't go up",
    })
    : key === "down" && value < 3 ?
    this.setState({
      ...this.state,
      y: value + 1,
      count: this.state.count + 1,
      moveError: '',
    })
    : this.setState({
      ...this.state,
      moveError: "You can't go down",
    })
  }
  moveX = (key, value) => {
    key === "left" && value > 1 ? this.setState({
      ...this.state,
      x: value - 1,
      count: this.state.count + 1,
      moveError: '',
    })
    : key === "left" && value === 1 ?
    this.setState({
      ...this.state,
      moveError: "You can't go left",
    })
    : key === "right" && value < 3 ?
    this.setState({
      ...this.state,
      x: value + 1,
      count: this.state.count + 1,
      moveError: '',
    })
    : this.setState({
      ...this.state,
      moveError: "You can't go right",
    })
  }

  resetHandler = () => {
    this.setState({
      ...this.state,
      moveError: '',
      email: '',
      x: 2,
      y: 2,
      count: 0
    })
  }

  onChange = event => {
    this.setState({email: event.target.value});
  }

  postToAxios = event => {
    event.preventDefault();
    const newSubs = {
      x: this.state.MoveX,
      y: this.state.moveY,
      
    }
  }
  
  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message">{this.state.moveError}</h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
