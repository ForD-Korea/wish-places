import React from 'react';

const WishPlaceItem = props => {
  const { name, address, setMapCenter, x, y } = props;

  return (
    <li onMouseOver={() => setMapCenter({ latitude: y, longitude: x })} className="place-item">
      <span className="place-name">{name}</span>
      <p className="place-address">{address}</p>
    </li>
  );
};

export default props => {
  const { setMapCenter, places } = props;
  const wishPlaceList = places.map(
    (item, index) => <WishPlaceItem key={`wish-item-${index}`} {...item} setMapCenter={setMapCenter} />
  );

  return (
    <ul className="wish-list">
      {wishPlaceList}
    </ul>
  );
}