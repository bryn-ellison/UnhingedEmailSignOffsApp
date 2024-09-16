const AdminButton = ({ handleAdminButtonClick, buttonText, slug }) => {
  function handleButtonClick() {
    handleAdminButtonClick(buttonText, slug);
  }

  return (
    <button className="ui-btn" onClick={handleButtonClick}>
      {buttonText}
    </button>
  );
};

export default AdminButton;
