import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import AuthenticationButton from "./AuthenticationButton";

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
        </div>
      )
    );
  };

  return (
    <div className="admin-container">
      <h1>Admin Area</h1>
      <AuthenticationButton />
      <CheckLogin />
    </div>
  );
};

export default AdminArea;
