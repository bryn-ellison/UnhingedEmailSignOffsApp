import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import CreateSignOff from "./CreateSignOff.jsx";
import ErrorPage from "./error-page";
import Admin from "./Admin";
import "./index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const Auth0ProviderLayout = () => (
  <Auth0Provider
    domain="dev-pc2rdn4i8ffin0d4.uk.auth0.com"
    clientId="yBHkadJfpzGsft7alJBqteh78Uj5UEMW"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <Outlet />
  </Auth0Provider>
);

const router = createBrowserRouter([
  {
    element: <Auth0ProviderLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/create",
        element: <CreateSignOff />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/admin",
        element: <Admin />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
