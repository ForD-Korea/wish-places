import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';
import SearchBar from './components/SearchBar';
import Popup from './components/Popup';
import WishList from './components/WishList';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentLocation: {
        longitude: 127.105399,
        latitude: 37.3595704
      },
      mapCenterCoords: {
        longitude: 127.105399,
        latitude: 37.3595704
      },
      markerList: [],
      popupData: {},
      isPopupOpen: false,
      places: []
    };
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMarkerList = this.setMarkerList.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      this.setState({
        currentLocation: {
          latitude, longitude
        },
        mapCenterCoords: {
          latitude, longitude
        }
      });
    });
  }

  render() {
    const maybePopup = this.state.isPopupOpen ?
     <Popup {...this.state.popupData} closePopup={this.closePopup}/> : null;
    return (
      <div className="App">
        <Map 
          currentLocation={this.state.currentLocation}
          mapCenterCoords={this.state.mapCenterCoords}
          markerList={this.state.markerList}
          places={this.state.places}/>
        <SearchBar 
          coords={this.state.currentLocation}
          setMapCenter={this.setMapCenter}
          setMarkerList={this.setMarkerList}
          openPopup={this.openPopup}/>
        <WishList places={this.state.places} setMapCenter={this.setMapCenter}/>
        {maybePopup}
      </div>
    );
  }

  setMapCenter(coords) {
    this.setState({
      mapCenterCoords: coords
    });
  }

  setMarkerList(markerList) {
    this.setState({
      markerList
    });
  }

  openPopup(data) {
    this.setState({
      popupData: data,
      isPopupOpen: true
    });
  }

  closePopup(data) {
    const { confirm } = data;

    this.setState({
      isPopupOpen: false
    });

    if (confirm) {
      delete data.confirm;
      this.addPlace(data);

      return;
    }


  }

  addPlace(place) {
    const { places } = this.state;

    this.setState({
      places: [...places, place]
    });
  }
}

export default App;
