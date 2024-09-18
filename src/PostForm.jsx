import React, { useState } from "react";
import axios from "axios";

const FormComponent = ({ handleSubmitForm }) => {
  const [formData, setFormData] = useState({
    signOff: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs",
        formData
      );
      console.log("Form data submitted successfully:", response.data);
      handleSubmitForm();
    } catch (error) {
      console.error("Error submitting form data:", error);
      handleSubmitForm(error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit} id="submit-signoff-form">
      <textarea
        className="form-fields"
        rows={5}
        name="signOff"
        placeholder="Enter your unhinged email sign off"
        value={formData.message}
        onChange={handleChange}
        maxLength={499}
      />
      <input
        className="form-fields"
        type="text"
        name="author"
        placeholder="Enter your name"
        value={formData.name}
        onChange={handleChange}
        maxLength={99}
      />
    </form>
  );
};

export default FormComponent;
