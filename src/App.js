import React, { Component } from 'react';
import './App.css';

import Map from './components/Map';
import SearchBar from './components/SearchBar';
import Popup from './components/Popup';
import WishList from './components/WishList';

class App extends Component {
  constructor(props) {
    super(props);

    /*
      App에서 갖고 관리하는 state는 아래와 같습니다.

      - 현재 위치(currentLocation)
      - 지도에서 보여주는 위치 (mapCenterCoords)
      - 검색 후 지도에 검색 결과를 출력해줄 위치들의 정보 리스ㅌ (markerList)
      - 팝업에 넘겨줄 제목, 주소 등의 데이터 (popupData)
      - 팝업 노출 여부를 판단하는 변수 (isPopupOpen)
      - 가고자 하는 wish place들의 정보를 갖고 있는 리스트 (places)

      default state로는 아래와 같이 지정을 해주고 있습니다.
    */
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
    /*
      자식 컴포넌트에 해당 메서드들을 내려주어도 this는 App을 가르키도록
      bind라는 메서드를 사용하였습니다.

      Javacript Function bind 참고 링크:
      https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
    */
    this.setMapCenter = this.setMapCenter.bind(this);
    this.setMarkerList = this.setMarkerList.bind(this);
    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  /*
    Component가 최초로 마운트 되었을때 componentDidMount 메소드가 호출이 됩니다.
  */
  componentDidMount() {
    /*
      componentDidMount에서 geolocation 객체에 있는 getCurrentPosition이라는 메서드를 이용해서
      현재 위치를 받아 오고 현재 위치를 갖고 있는 state(currentLocation)와 지도에 보여지는 위치를 보여지는 state(mapCenterCoords)를
      setState를 이용해서 변경 해줍니다.

      getCurrentPosition에 대해서는 아래 링크를 참조하세요.
      https://developer.mozilla.org/ko/docs/Web/API/Geolocation/getCurrentPosition
    */
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
    /*
      state에 있는 isPopupOpen이라는 변수를 이용해서 Popup 컴포넌트를 노출해줄지 노출하지 않을지 판단을 하여
      maybePopup이라는 변수에 담습니다.
    */
    const maybePopup = this.state.isPopupOpen ?
     <Popup {...this.state.popupData} closePopup={this.closePopup}/> : null;

     /*
      App 컴포넌트는 자식 컴포넌트로 Map, SearchBar, WishList 이렇게 세개의 컴포넌트를 가집니다.
      - Map: 네이버 지도를 갖고 있는 지도 컴포넌트
      - SearchBar: 장소 검색을 할 수 있는 input 컴포넌트
      - WishList: 장소를 검색해 선택해서 저장한 위치들을 보여주는 리스트 컴포넌트
     */

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

  /*
    지도의 중심을 변경하는 메서드
  */

  setMapCenter(coords) {
    this.setState({
      mapCenterCoords: coords
    });
  }
  /*
    지도 위에 찍히는 marker들을 변경하는 메서드
  */

  setMarkerList(markerList) {
    this.setState({
      markerList
    });
  }
  
  /*
    팝업에 띄워줄 주소, 장소 이름 등의 데이터를 받아
    팝업을 띄워주는 메서드
  */
  openPopup(data) {
    this.setState({
      popupData: data,
      isPopupOpen: true
    });
  }

  /*
    팝업을 닫으면서 popup이 확인 버튼을 클릭했는지 아닌지를 판별하여, 팝업을 초기화 시키며 닫은 후
    리스트에 추가하는 메서드입니다.
  */
  closePopup(data) {
    const { confirm, ...placeData } = data;

    this.setState({
      isPopupOpen: false,
    });

    if (confirm) {
      this.addPlace(placeData);

      this.setState({
        markerList: [],
      });

      return;
    }


  }

  /*
    추가되는 wish place의 정보를 받아서 wish place list에 추가하는 메서드
  */
  addPlace(place) {
    const { places } = this.state;

    this.setState({
      places: [...places, place]
    });
  }
}

export default App;
