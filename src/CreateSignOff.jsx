import { useState } from "react";
import { Link } from "react-router-dom";
import NavigateButton from "./NavigateButton";
import PostForm from "./PostForm";
import FormSubmittedSuccess from "./FormSubmittedSuccess";
import FormSubmittedError from "./FormSubmittedError";

const CreateSignOff = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmitForm = (err = "") => {
    if (err) {
      setFormError(err);
    } else {
      setFormSubmitted(true);
    }
  };

  const displayForm = () => {
    if (formSubmitted) {
      return <FormSubmittedSuccess />;
    } else if (formError) {
      return <FormSubmittedError error={formError} />;
    } else {
      return <PostForm handleSubmitForm={handleSubmitForm} />;
    }
  };

  const displayButtons = () => {
    if (formSubmitted || formError) {
      return (
        <Link reloadDocument to={"/create"}>
          <NavigateButton page={"/create"} buttonText={"Send another"} />
        </Link>
      );
    } else {
      return (
        <button className="ui-btn" form="submit-signoff-form" type="submit">
          Submit
        </button>
      );
    }
  };

  return (
    <div className="content-container">
      <div className="signOff-container">{displayForm()}</div>
      <div className="buttons-container">
        {displayButtons()}
        <NavigateButton page={"/"} buttonText={"Go back"} />
      </div>
    </div>
  );
};

export default CreateSignOff;
