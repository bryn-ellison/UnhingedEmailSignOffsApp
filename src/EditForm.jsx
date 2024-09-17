import React, { useState } from "react";

const EditForm = ({ handleEditForm, signOff }) => {
  const [formData, setFormData] = useState({
    signOff: signOff.signOff,
    author: signOff.author,
  });
  const { getAccessTokenSilently } = useAuth0();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "UnhingedEmailSignOffsApi",
          scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
        },
      });
      let callUrl =
        "https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/";
      const response = await fetch(callUrl, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleEditForm();
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <div className="edit-form-container">
      <div className="form-container">
        <form onSubmit={handleSubmit} id="submit-edit-form">
          <textarea
            className="form-fields"
            rows={5}
            name="signOff"
            placeholder="Enter your unhinged email sign off"
            value={formData.message}
            onChange={handleChange}
          />
          <input
            className="form-fields"
            type="text"
            name="author"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </form>
      </div>
      <div className="buttons-container">
        <button className="ui-btn" form="submit-edit-form" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default EditForm;
