import React from 'react';

const Popup = props => {
  const { name, jibun_address: address, closePopup, x, y } = props;

  return (
    <div className="popup">
      <div className="overlay" onClick={() => closePopup({ confirm: false })}></div>
      <div className="popup-content">
        <span className="name">{name}</span>
        <span className="address">{address}</span>
        <div className="btn-group">
          <button type="button" onClick={() => closePopup({ confirm: true, name, address, x, y, })}>확인</button>
          <button type="button" onClick={() => closePopup({ confirm: false })}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default Popup;