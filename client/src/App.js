import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date(),
                  displayHeader: {
                    deviceType: 'MirrorDisplay',
                    deviceId: 4 // Will be taken from URL parameters
                  },
                  socket: socketIOClient('http://localhost:4200'),
                  message: ''};
  }


  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    // Let server know connection is from display
    //this.socket.join('acc_1');
    this.state.socket.emit('screenConnected');
    this.state.socket.on('screenConnectedReponse', (message) => {
      // setting the color of our button
      this.state.message = message
      console.log(message)
    })
  }

  componentWillUnmount() {
    this.socket.emit('disconnected')
    // Disconnect Socket
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }



  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        <h3>Client Device Type: {this.state.displayHeader.deviceType}</h3>
        <h3>Server Message: {this.state.message}.</h3>
      </div>
    );
  }
}

export default App;
