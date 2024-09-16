const AdminTaskButton = ({ handleAdminButtonClick, buttonText, id }) => {
  function handleButtonClick() {
    handleAdminButtonClick(buttonText, id);
  }

  return (
    <button className="ui-btn" onClick={handleButtonClick}>
      {buttonText}
    </button>
  );
};

export default AdminTaskButton;
