import React from 'react';

const Popup = props => {
  const { name, jibun_address: address, closePopup, x, y } = props;

  return (
    <div className="popup">
      {/* 팝업 뒤에 dimd 처리 되어있는 overlay를 클릭했을 경우 팝업이 닫히도록 합니다. */}
      <div className="overlay" onClick={() => closePopup({ confirm: false })}></div>
      <div className="popup-content">
        {/* 팝업에 위치 이름을 노출합니다. */}
        <span className="name">{name}</span>
        {/* 팝업에 위치 주소를 노출합니다. */}
        <span className="address">{address}</span>
        <div className="btn-group">
          {/* 팝업에 확인 버튼을 클릭했을 경우 팝업이 닫히면서 추가한 위치의 정보를 App 컴포넌트로 전달합니다. */}
          <button type="button" onClick={() => closePopup({ confirm: true, name, address, x, y, })}>확인</button>
          {/* 팝업에 취소 버튼을 클릭했을 경우 팝업이 닫히도록 합니다. */}
          <button type="button" onClick={() => closePopup({ confirm: false })}>취소</button>
        </div>
      </div>
    </div>
  )
}

export default Popup;