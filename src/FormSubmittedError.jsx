const showFormError = ({ error }) => {
  return (
    <div>
      <p>Sorry, there was a problem submitting your sign off:</p>
      <p>{error}</p>
    </div>
  );
};

export default showFormError;
