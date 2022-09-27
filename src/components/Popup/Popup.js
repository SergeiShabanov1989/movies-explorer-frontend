import { useEffect } from 'react';
import close from "../../images/CloseIcon.svg"

function Popup({setShowPopup, errorMessage}) {
  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  },[])

  const onClose = () => {
    setShowPopup(false)
  }

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <p className="popup__text">
          {errorMessage}
        </p>
        <img className="popup__close" src={close} alt="Удалить" onClick={onClose} />
      </div>
    </div>
  )
}

export default Popup;