import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);

    this.mapElement = React.createRef();
  }

  componentDidMount() {
    const { latitude, longitude } = this.props.mapCenterCoords;
    const map = new window.naver.maps.Map(this.mapElement.current, {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 11
    });

    this.map = map;
  }

  
  markCurrentLocation (coords, map) {
    const { latitude, longitude } = coords;
    const markerCoords = new window.naver.maps.LatLng(latitude, longitude);

    new window.naver.maps.Marker({ 
      position: markerCoords,
      title: '현위치',
      map,
      icon: {
        content: `<div class="current-marker"></div>`
      }
    });
  }

  componentDidUpdate() {
    const { map } = this;
    const { latitude, longitude } = this.props.mapCenterCoords;
    const { markerList } = this.props;
    const newCenterPosition = new window.naver.maps.LatLng(latitude, longitude);

    this.markCurrentLocation(this.props.currentLocation, map);

    markerList.forEach(
      marker => {
        const markerCoords = new window.naver.maps.LatLng(marker.y, marker.x);

        new window.naver.maps.Marker({ 
          position: markerCoords,
          title: marker.name,
          map
        });
      }
    );

    map.setCenter(newCenterPosition);
  }

  render() {
    return (
      <div ref={this.mapElement} id="map" style={{ position: 'absolute', width: '80%', height: '100%' }}>
      </div>
    );
  }
}

export default Map;