import React from 'react';

/*
  WishPlaceItem은 Wish place에 있는 아이템 하나를 의미합니다.
  해당 컴포넌트는 wish place에 대한 정보를 받아 이름과 주소를 노출하고,
  마우스 오버 했을 경우 지도의 중심을 해당 아이템의 위치로 이동합니다.
*/
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
  /*
    App으로부터 WishPlaceList를 받아 WishPlaceItem으로 출력합니다.
  */
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