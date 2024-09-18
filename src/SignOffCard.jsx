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
      const response = await fetch(callUrl, {
        method: "PATCH",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditSignOffOpen(false);
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

  // async function handleApproveTask() {
  //   try {
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: "UnhingedEmailSignOffsApi",
  //         scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
  //       },
  //     });
  //     await approveSignOff(token, signOff.id);
  //     handleTaskButtonClick();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function handleDeleteTask() {
  //   try {
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: "UnhingedEmailSignOffsApi",
  //         scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
  //       },
  //     });
  //     await deleteSignOff(token, signOff.id);
  //     handleTaskButtonClick();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  // function handleEditTask() {
  //   setIsEditSignOffOpen((prevState) => !prevState);
  // }

  console.log(isEditSignOffOpen);

  return (
    // <div className="signoff-card">
    //   <p className="admin-list-item">{signOff.signOff}</p>
    //   <p className="admin-list-item">{signOff.author}</p>
    //   <div className="admin-buttons-container">
    //     <button className="ui-btn" onClick={handleApproveTask}>
    //       Approve
    //     </button>
    //     <button className="ui-btn" onClick={handleDeleteTask}>
    //       Delete
    //     </button>
    //     <button className="ui-btn" onClick={handleEditTask}>
    //       Edit
    //     </button>
    //   </div>
    // </div>

    // <div className="signOff-container">
    //   <div className="signoff-card">
    //     <p className="admin-list-item">{signOff.signOff}</p>
    //     <p className="admin-list-item">{signOff.author}</p>

    //   </div>
    <div className="signOff-card">
      {!isEditSignOffOpen ? (
        <div>
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
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          id="submit-edit-form"
          className="signOff-card"
        >
          <textarea
            className="form-fields"
            rows={3}
            name="signOff"
            value={formData.signOff}
            onChange={handleChange}
          />
          <input
            className="form-fields"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
          <div className="admin-buttons-container">
            <button className="ui-btn" form="submit-edit-form" type="submit">
              Submit
            </button>
            <button
              className="ui-btn"
              onClick={() => setIsEditSignOffOpen((prevState) => !prevState)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignOffCard;
