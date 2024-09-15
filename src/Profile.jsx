import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AdminButton from "./AdminButton";

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [signOffs, setSignOffs] = useState(null);
  const [listView, setListView] = useState("To Approve");
  const [urlSlug, setUrlSlug] = useState("toapprove");

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "UnhingedEmailSignOffsApi",
            scope: "read:signoffs write:signoffs update:signoffs",
          },
        });
        const response = await fetch(
          `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/${urlSlug}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSignOffs(await response.json());
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, listView]);

  function handleAdminButtonClick(viewName, slug) {
    setListView(viewName);
    setUrlSlug(slug);
  }

  if (!signOffs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>{listView}</h2>
      <div className="admin-buttons-container">
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
      <ul>
        {signOffs.map((signOff, index) => {
          return (
            <li key={index}>
              <p className="admin-list-item">{signOff.signOff}</p>
              <p className="admin-list-item">{signOff.author}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Profile;
