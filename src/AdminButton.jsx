const AdminButton = ({ handleAdminButtonClick, buttonText, slug, id }) => {
  function handleButtonClick() {
    handleAdminButtonClick(buttonText, slug, id);
  }

  return (
    <button className="ui-btn" onClick={handleButtonClick}>
      {buttonText}
    </button>
  );
};

export default AdminButton;
