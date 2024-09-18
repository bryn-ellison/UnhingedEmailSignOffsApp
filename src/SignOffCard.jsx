import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminTaskButton from "./AdminTaskButton";
import { approveSignOff, deleteSignOff } from "./DataFunctions";

const SignOffCard = ({ signOff, listView }) => {
  const [formData, setFormData] = useState({
    signOff: signOff.signOff,
    author: signOff.author,
  });
  const { getAccessTokenSilently } = useAuth0();
  const [adminTaskCompleted, setAdminTaskCompleted] = useState(0);
  const [isEditSignOffOpen, setIsEditSignOffOpen] = useAuth0(false);

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
        body: JSON.stringify(formData),
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
    console.log("THIS SHOULDNT FIRE");
    // try {
    //   const token = await getAccessTokenSilently({
    //     authorizationParams: {
    //       audience: "UnhingedEmailSignOffsApi",
    //       scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
    //     },
    //   });
    if (buttonText === "Approve") {
      //await approveSignOff(token, signOff.id);
      setAdminTaskCompleted(adminTaskCompleted + 1);
    } else if (buttonText === "Delete") {
      //await deleteSignOff(token, signOff.id);
      setAdminTaskCompleted(adminTaskCompleted + 1);
    } else {
      setIsEditSignOffOpen(true);
    }
    // } catch (e) {
    //   console.error(e);
    // }
  }

  return (
    <div className="signoff-card">
      <p className="admin-list-item">{signOff.signOff}</p>
      <p className="admin-list-item">{signOff.author}</p>
      <div className="admin-buttons-container">
        <button
          className="ui-btn"
          onClick={() => handleAdminTaskButtonClick("Approve")}
        >
          Approve
        </button>
        <button
          className="ui-btn"
          onClick={() => handleAdminTaskButtonClick("Delete")}
        >
          Delete
        </button>
        <button
          className="ui-btn"
          onClick={() => handleAdminTaskButtonClick("Edit")}
        >
          Edit
        </button>
      </div>
    </div>

    // <div className="signOff-container">
    //   <div className="signoff-card">
    //     <p className="admin-list-item">{signOff.signOff}</p>
    //     <p className="admin-list-item">{signOff.author}</p>

    //   </div>

    // {/* {!isEditSignOffOpen ? (
    //   <div className="signoff-card">
    //     <p className="admin-list-item">{signOff.signOff}</p>
    //     <p className="admin-list-item">{signOff.author}</p>
    //     {listView === "To Approve" ? (
    //       <div className="admin-buttons-container">
    //         <AdminTaskButton
    //           handleAdminTaskButtonClick={handleAdminTaskButtonClick}
    //           buttonText={"Approve"}
    //         />
    //         <AdminTaskButton
    //           handleAdminTaskButtonClick={handleAdminTaskButtonClick}
    //           buttonText={"Delete"}
    //         />
    //         <AdminTaskButton
    //           handleAdminTaskButtonClick={handleAdminTaskButtonClick}
    //           buttonText={"Edit"}
    //         />
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    // ) : (
    //   <form onSubmit={handleSubmit} id="submit-edit-form">
    //     <textarea
    //       className="form-fields"
    //       rows={5}
    //       name="signOff"
    //       value={signOff.signOff}
    //       onChange={handleChange}
    //     />
    //     <input
    //       className="form-fields"
    //       type="text"
    //       name="author"
    //       value={signOff.author}
    //       onChange={handleChange}
    //     />
    //     <button className="ui-btn" form="submit-edit-form" type="submit">
    //       Submit
    //     </button>
    //     <button className="ui-btn" onClick={setIsEditSignOffOpen(false)}>
    //       Cancel
    //     </button>
    //   </form>
    // )} */}
    // </div>
  );
};

export default SignOffCard;
