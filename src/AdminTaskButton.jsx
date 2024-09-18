const AdminTaskButton = ({ handleAdminTaskButtonClick, buttonText }) => {
  function handleButtonClick() {
    handleAdminTaskButtonClick(buttonText);
  }

  return (
    <button className="ui-btn" onClick={handleButtonClick}>
      {buttonText}
    </button>
  );
};

export default AdminTaskButton;
