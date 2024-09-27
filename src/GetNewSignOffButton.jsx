import { useState } from "react";

const getNewButton = ({ handleFinishedtyping }) => {
  const [disable, setDisable] = useState(false);

  function handleButtonClick() {
    handleFinishedtyping(false);
    setDisable(true);
    setTimeout(() => {
      setDisable(false);
    }, 1500);
  }

  return (
    <button
      disabled={disable}
      style={{ backgroundColor: disable ? "#ffc8d1" : "whitesmoke" }}
      className="ui-btn"
      onClick={handleButtonClick}
    >
      Again
    </button>
  );
};

export default getNewButton;
