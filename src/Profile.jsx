import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// const Profile = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   const [apiAccessToken, setApiAccessToken] = useState(null);

//   useEffect(() => {
//     const getUserMetadata = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently({
//           authorizationParams: {
//             audience: "UnhingedEmailSignOffsApi",
//             scope: "read:signoffs write:signoffs update:signoffs",
//           },
//         });
//         setApiAccessToken(accessToken);
//       } catch (e) {
//         console.log(e.message);
//       }
//     };

//     getUserMetadata();
//   }, [getAccessTokenSilently, user?.sub]);

//   return (
//     isAuthenticated && (
//       <div>
//         <AdminSignOffLists />
//       </div>
//     )
//   );
// };

const Profile = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [signOffs, setSignOffs] = useState(null);

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
          "https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs/approve",
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
  }, [getAccessTokenSilently]);

  if (!signOffs) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {signOffs.map((signOff, index) => {
        return (
          <li key={index}>
            <p>{signOff.signOff}</p>
            <p>{signOff.author}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Profile;
