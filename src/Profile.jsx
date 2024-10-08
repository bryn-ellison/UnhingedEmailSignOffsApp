import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminButton from "./AdminButton";
import SignOffCard from "./SignOffCard";

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
        console.error(e.message);
      }
    })();
  }, [getAccessTokenSilently, listView, adminTaskCompleted]);

  function handleAdminButtonClick(viewName, slug) {
    handleTaskButtonClick();
    setListView(viewName);
    setUrlSlug(slug);
  }

  function handleTaskButtonClick() {
    setAdminTaskCompleted((prevCount) => prevCount + 1);
  }

  if (!signOffs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <div className="buttons-container">
        <AdminButton
          handleAdminButtonClick={handleAdminButtonClick}
          buttonText={"To Approve"}
          slug={"toapprove"}
        />
        <AdminButton
          handleAdminButtonClick={handleAdminButtonClick}
          buttonText={"Deleted"}
          slug={"deleted"}
        />
        <AdminButton
          handleAdminButtonClick={handleAdminButtonClick}
          buttonText={"All Approved"}
          slug={"all"}
        />
      </div>
      <h1>{listView}</h1>
      <ul>
        {signOffs.map((signOff, index) => {
          return (
            <li key={index}>
              <SignOffCard
                handleTaskButtonClick={handleTaskButtonClick}
                signOff={signOff}
                listView={listView}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Profile;
