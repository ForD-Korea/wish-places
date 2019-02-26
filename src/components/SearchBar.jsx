import React, { Component } from 'react';
import { fetchPlaceInfo } from '../api';

/*
  SearchList는 검색 결과를 리스트로 출력해주는 컴포넌트입니다.
*/
const SearchList = props => {
  const { setMapCenter, searchPlaces, openPopup, clearSearchBar } = props;
  /*
    searchList는 검색 결과를 받아와서 li 태그를 이용하여 리스트로 만들어 searchList에 담습니다.
  */
  const searchList = searchPlaces.map(
  (item, index) => (
    <li 
      key={`search-place-${index}`} 
      onMouseOver={() => setMapCenter({ latitude: item.y, longitude: item.x })}
      onClick={() => {
        clearSearchBar();
        openPopup(item);
      }}>
      <span className="name">{item.name}</span>
      <span className="address">{item.road_address}</span>
      <p></p>
    </li>
  ));

  return (
    <ul>
      {searchList}
    </ul>
  )

}

class SearchBar extends Component {
  constructor(props) {
    super(props);

    /*
      SearchBar에서 갖고 관리하는 state는 아래와 같습니다.

      - API를 호출한 후 로딩되기까지의 시그널 변수(isLoad)
      - input의 값을 갖고 있는 변수 (inputText)
      - 검색 결과 위치정보 리스트 (searchPlaces)

      default state로는 아래와 같이 지정을 해주고 있습니다.
    */
    this.state = {
      isLoad: false,
      inputText: '',
      searchPlaces: []
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onSearchPlace = this.onSearchPlace.bind(this);
    this.clearSearchBar = this.clearSearchBar.bind(this);
  }

  render() {
    const { searchPlaces } = this.state;
    // 검색 결과가 있을 경우 SearchList를 출력해줍니다.
    const maybeSearchList = !!searchPlaces.length ? <SearchList searchPlaces={searchPlaces} clearSearchBar={this.clearSearchBar} {...this.props}/> : null;
    // 검색을 시도한 후, 응답 값이 오기전까지 로딩중이라는 텍스트를 노출해주도록 합니다.
    const submitButtonText = this.state.isLoad ? '로딩중..' : '검색';

    return (
      <div className="search-bar">
        <input type="text" value={this.state.inputText} onChange={this.onChangeInput} onKeyDown={this.onKeyDown}/>
        <button type="button" onClick={this.onSearchPlace}>{submitButtonText}</button>
        {maybeSearchList}
      </div>
    );
  }

  /*
    input 값이 변경 될 때, state 값에 반영해줍니다.
  */
  onChangeInput(event) {
    const { value } = event.target;

    this.setState({
      inputText: value
    });
  }

  /*
    input에서 엔터를 쳤을 경우 검색이 가능하도록 추가해줍니다.
  */
  onKeyDown(event) {
    if (event.keyCode === 13) this.onSearchPlace();
  }

  /*
    검색을 시도 했을 경우 호출하는 메서드
  */
  onSearchPlace() {
    const { inputText } = this.state;
    const { coords } = this.props;

    /*
      검색을 시도하면서 isLoad를 참으로 변경해줍니다.
      isLoad가 참으로 변경되면, 버튼에 로딩중이라는 텍스트로 변경됩니다.
    */
    this.setState({
      isLoad: true
    });

    /*
      위치 검색을 가져오는 fetchPlaceInfo를 호출합니다.
      이때 현재 위치와 검색어를 인자로 전달합니다.
    */
    fetchPlaceInfo(inputText, coords)
    .then(response => {
      /*
        응답 값으로 검색 결과가 오면 searchPlaces를 변경해줍니다.
        아래 변수 선언 방식은 Object destructuring입니다.

        https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      */
      const { data: { places: searchPlaces } } = response;

      this.setState({
        searchPlaces,
        isLoad: false
      });

      /*
        네이버 지도에 검색 결과 마커를 찍기 위해서 setMarkerList를 호출하여서,
        App 컴포넌트에 있는 places를 변경해줍니다.
      */
      this.props.setMarkerList(searchPlaces);
    })
    .catch(error => {
      /*
       오류가 발생했을 경우에는 isLoad를 거짓으로 바꾸어 버튼을 원상복귀 시키고,
       console에 에러를 출력합니다.
      */
      this.setState({
        isLoad: false
      });

      console.error(error);
    });
  }

  /*
    원하는 위치를 선택했을 경우 input과 검색결과를 초기화 시킵니다.
  */
  clearSearchBar() {
    this.setState({
      searchPlaces: [],
      inputText: ''
    });
  }
}

export default SearchBar;