import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        longitude: 127.105399,
        latitude: 37.3595704
      }
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      this.setState({
        currentLocation: {
          latitude, longitude
        }
      });
    });
  }

  render() {
    console.log(this.state.currentLocation);
    return (
      <div className="App">
        <Map currentLocation={this.state.currentLocation}/>
      </div>
    );
  }
}

export default App;
