import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';
import SearchBar from './components/SearchBar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        longitude: 127.105399,
        latitude: 37.3595704
      },
      markerList: []
    };
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMarkerList = this.setMarkerList.bind(this);
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
    return (
      <div className="App">
        <Map 
          currentLocation={this.state.currentLocation}
          markerList={this.state.markerList}/>
        <SearchBar 
          coords={this.state.currentLocation}
          setMapCenter={this.setMapCenter}
          setMarkerList={this.setMarkerList}/>
      </div>
    );
  }

  setMapCenter(coords) {
    this.setState({
      currentLocation: coords
    });
  }

  setMarkerList(markerList) {
    this.setState({
      markerList
    });
  }
}

export default App;
