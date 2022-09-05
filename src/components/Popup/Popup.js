import close from "../../images/CloseIcon.svg"

function Popup({setShowPopup, errorMessage}) {
  const onClose = () => {
    setShowPopup(false)
  }

  return (
    <div className="popup">
      <p className="popup__text">
        {errorMessage}
      </p>
      <img className="popup__close" src={close} alt="Удалить" onClick={onClose} />
    </div>
  )
}

export default Popup;