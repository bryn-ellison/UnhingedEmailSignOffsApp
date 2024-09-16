const AdminTaskButton = ({ handleAdminTaskButtonClick, buttonText, id }) => {
  function handleButtonClick() {
    handleAdminTaskButtonClick(buttonText, id);
  }

  return (
    <button className="ui-btn" onClick={handleButtonClick}>
      {buttonText}
    </button>
  );
};

export default AdminTaskButton;
