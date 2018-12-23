import React, { Component } from 'react';
import { fetchPlaceInfo } from '../api';

const SearchList = props => {
  const { setMapCenter, searchPlaces, openPopup, clearSearchBar } = props;
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
    const maybeSearchList = !!searchPlaces.length ? <SearchList searchPlaces={searchPlaces} clearSearchBar={this.clearSearchBar} {...this.props}/> : null;
    const submitButtonText = this.state.isLoad ? '로딩중..' : '검색';

    return (
      <div className="search-bar">
        <input type="text" value={this.state.inputText} onChange={this.onChangeInput} onKeyDown={this.onKeyDown}/>
        <button type="button" onClick={this.onSearchPlace}>{submitButtonText}</button>
        {maybeSearchList}
      </div>
    );
  }

  onChangeInput(event) {
    const { value } = event.target;

    this.setState({
      inputText: value
    });
  }

  onKeyDown(event) {
    if (event.keyCode === 13) this.onSearchPlace();
  }

  onSearchPlace() {
    const { inputText } = this.state;
    const { coords } = this.props;

    this.setState({
      isLoad: true
    });

    fetchPlaceInfo(inputText, coords)
    .then(response => {
      const { data: { places: searchPlaces } } = response;

      this.setState({
        searchPlaces,
        isLoad: false
      });
      this.props.setMarkerList(searchPlaces);
    })
    .catch(error => {
      this.setState({
        isLoad: false
      });

      console.error(error);
    });
  }

  clearSearchBar() {
    this.setState({
      searchPlaces: [],
      inputText: ''
    });
  }
}

export default SearchBar;