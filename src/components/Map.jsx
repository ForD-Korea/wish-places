import React, { Component } from 'react';

class Map extends Component {
  /*
    mapElement는 Naver Map API로 지도를 그려줄 컨테이너를 지정하기 위해 ref를 생성해줍니다.
  */
  mapElement = React.createRef();
  mapMarkerList = [];
  /*
    component가 최초로 Mount 되었을때 현재 지도 중심의 좌표를 받아와 지도의 center를 지정해줍니다.
    그리고 현재 위치를 받아 "현재 위치 마커"를 찍는 markCurrentLocation을 호출합니다.
    네이버 지도를 생성하고 반환 된 Naver map 객체는 Map 컴포넌트 내에 저장합니다.
  */

  componentDidMount() {
    const { latitude, longitude } = this.props.mapCenterCoords;
    const map = new window.naver.maps.Map(this.mapElement.current, {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 11
    });

    this.markCurrentLocation(this.props.currentLocation, map);

    this.map = map;
  }

  /*
    현재 위치와 네이버 지도 객체를 받아서 지도 위에 객체를 찍어줍니다.
  */
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

  /*
    componetDidUpdate에서는 컴포넌트가 매번 다시 그려줘야하는 부분들을 작성했습니다.

  */
  componentDidUpdate() {
    const { map } = this;
    const { latitude, longitude } = this.props.mapCenterCoords;
    const { markerList, places } = this.props;
    const newCenterPosition = new window.naver.maps.LatLng(latitude, longitude);

    /*
      현재위치를 찍어주는 markCurrentLocation을 찍어줍니다.
    */
    this.markCurrentLocation(this.props.currentLocation, map);

    /*
      wish place list를 받아와서 지도에 마커로 찍어줍니다.
    */
    places.forEach(marker => {
      const markerCoords = new window.naver.maps.LatLng(marker.y, marker.x);

      new window.naver.maps.Marker({ 
        position: markerCoords,
        title: marker.name,
        map,
        icon: {
          content: '<div class="wish-place-marker"></div>'
        }
      });
    })

    /*
      검색결과 리스트에 있는 위치들을 마커로 찍어주기 위해 기존에 찍혀 있던 마커들을 삭제합니다.
    */
    this.mapMarkerList.forEach(marker => marker.setMap(null));

    /*
      검색결과 리스트를 받아와 지도 위에 마커를 찍어줍니다.
    */

    this.mapMarkerList = markerList.map(
      (marker) => {
        const markerCoords = new window.naver.maps.LatLng(marker.y, marker.x);
     
        return new window.naver.maps.Marker({ 
          position: markerCoords,
          title: marker.name,
          map
        });
      });

    map.setCenter(newCenterPosition);
  }

  /*
    Naver 지도를 띄워줄 컨테이너를 반환해줍니다.
  */
  render() {
    return (
      <div ref={this.mapElement} id="map" style={{ position: 'absolute', width: '80%', height: '100%' }}>
      </div>
    );
  }
}

export default Map;