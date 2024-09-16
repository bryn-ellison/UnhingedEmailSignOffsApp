import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import CreateSignOff from "./CreateSignOff.jsx";
import ErrorPage from "./error-page";
import AdminArea from "./AdminArea";
import "./index.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";

const Auth0ProviderLayout = () => (
  <Auth0Provider
    domain="dev-pc2rdn4i8ffin0d4.uk.auth0.com"
    clientId="yBHkadJfpzGsft7alJBqteh78Uj5UEMW"
    authorizationParams={{
      redirect_uri: "https://unhingedemailsignoffs.netlify.app/admin",
      audience: "UnhingedEmailSignOffsApi",
      scope: "read:signoffs write:signoffs update:signoffs delete:signoffs",
    }}
  >
    <Outlet />
  </Auth0Provider>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Auth0ProviderLayout />}>
      <Route path="/" element={<App />} errorElement={<ErrorPage />}></Route>
      <Route
        path="/create"
        element={<CreateSignOff />}
        errorElement={<ErrorPage />}
      ></Route>
      <Route
        path="/admin"
        element={<AdminArea />}
        errorElement={<ErrorPage />}
      ></Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
