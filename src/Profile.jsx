import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminButton from "./AdminButton";
import { approveSignOff, deleteSignOff } from "./DataFunctions";

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [signOffs, setSignOffs] = useState(null);
  const [listView, setListView] = useState("To Approve");
  const [urlSlug, setUrlSlug] = useState("toapprove");
  const [adminTaskCompleted, setAdminTaskCompleted] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "UnhingedEmailSignOffsApi",
            scope:
              "read:signoffs write:signoffs update:signoffs delete:signoffs",
          },
        });
        let callUrl = `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/${urlSlug}`;
        const response = await fetch(callUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSignOffs(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, listView, adminTaskCompleted]);

  function handleAdminButtonClick(viewName, slug) {
    setListView(viewName);
    setUrlSlug(slug);
  }

  async function handleAdminTaskButtonClick(buttonText, id) {
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: "UnhingedEmailSignOffsApi",
          scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
        },
      });
      if (buttonText === "Approve") {
        await approveSignOff(token, id);
        setAdminTaskCompleted(adminTaskCompleted + 1);
      } else if (buttonText === "Delete") {
        await deleteSignOff(token, id);
        setAdminTaskCompleted(adminTaskCompleted + 1);
      } else {
        return "Edit";
      }
    } catch (e) {
      console.error(e);
    }
  }

  if (!signOffs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>{listView}</h2>
      <div className="admin-buttons-container">
        <AdminButton
          handleAdminTaskButtonClick={handleAdminTaskButtonClick}
          buttonText={"To Approve"}
          slug={"toapprove"}
        />
        <AdminButton
          handleAdminTaskButtonClick={handleAdminTaskButtonClick}
          buttonText={"Deleted"}
          slug={"deleted"}
        />
        <AdminButton
          handleAdminTaskButtonClick={handleAdminTaskButtonClick}
          buttonText={"All Approved"}
          slug={"all"}
        />
      </div>
      <ul>
        {signOffs.map((signOff, index) => {
          return (
            <li key={index}>
              <p className="admin-list-item">{signOff.signOff}</p>
              <p className="admin-list-item">{signOff.author}</p>
              <div className="admin-buttons-container">
                <AdminButton
                  handleAdminButtonClick={handleAdminButtonClick}
                  buttonText={"Approve"}
                  id={signOff.id}
                />
                <AdminButton
                  handleAdminButtonClick={handleAdminButtonClick}
                  buttonText={"Delete"}
                  id={signOff.id}
                />
                <AdminButton
                  handleAdminButtonClick={handleAdminButtonClick}
                  buttonText={"Edit"}
                  id={signOff.id}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Profile;
