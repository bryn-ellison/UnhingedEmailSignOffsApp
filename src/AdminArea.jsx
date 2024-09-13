import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Profile from "./Profile";

const AdminArea = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const CheckLogin = () => {
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    return (
      isAuthenticated && (
        <div>
          <Profile />
          <LogoutButton />
        </div>
      )
    );
  };

  return (
    <div>
      <h1>Admin Area</h1>
      <CheckLogin />
      <LoginButton />
    </div>
  );
};

export default AdminArea;
