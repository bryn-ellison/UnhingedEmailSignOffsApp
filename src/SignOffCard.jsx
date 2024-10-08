import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminTaskButton from "./AdminTaskButton";
import { approveSignOff, deleteSignOff } from "./DataFunctions";

const SignOffCard = ({ handleTaskButtonClick, signOff, listView }) => {
  const [formData, setFormData] = useState({
    signOff: signOff.signOff,
    author: signOff.author,
  });
  const { getAccessTokenSilently } = useAuth0();
  const [isEditSignOffOpen, setIsEditSignOffOpen] = useState(false);

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
      let callUrl = `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/${signOff.id}`;
      let requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          signOff: formData.signOff,
          author: formData.author,
        }),
      };
      const response = await fetch(callUrl, requestOptions);
      handleTaskButtonClick();
      setIsEditSignOffOpen((prevState) => !prevState);
      return response;
    } catch (e) {
      console.error(e.message);
    }
  };

  async function handleAdminTaskButtonClick(buttonText) {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "UnhingedEmailSignOffsApi",
          scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
        },
      });
      if (buttonText === "Approve") {
        await approveSignOff(token, signOff.id);
        handleTaskButtonClick();
      } else if (buttonText === "Delete") {
        await deleteSignOff(token, signOff.id);
        handleTaskButtonClick();
      } else {
        setIsEditSignOffOpen((prevState) => !prevState);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="signOff-card">
      {isEditSignOffOpen && listView === "To Approve" ? (
        <form onSubmit={handleSubmit} id="submit-edit-form">
          <textarea
            className="form-fields"
            rows={3}
            name="signOff"
            value={signOff.signOff}
            onChange={handleChange}
          />
          <input
            className="form-fields"
            type="text"
            name="author"
            value={signOff.author}
            onChange={handleChange}
          />
          <div className="admin-buttons-container">
            <button
              className="admin-ui-btn"
              form="submit-edit-form"
              type="submit"
            >
              Submit
            </button>
            <button
              className="admin-ui-btn"
              onClick={() => setIsEditSignOffOpen((prevState) => !prevState)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="admin-list-item">{signOff.signOff}</p>
          <p className="admin-list-item">{signOff.author}</p>
          {listView === "To Approve" ? (
            <div className="admin-buttons-container">
              <AdminTaskButton
                handleAdminTaskButtonClick={handleAdminTaskButtonClick}
                buttonText={"Approve"}
              />
              <AdminTaskButton
                handleAdminTaskButtonClick={handleAdminTaskButtonClick}
                buttonText={"Delete"}
              />
              <AdminTaskButton
                handleAdminTaskButtonClick={handleAdminTaskButtonClick}
                buttonText={"Edit"}
              />
            </div>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default SignOffCard;
