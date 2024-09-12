import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CreateSignOff from "./CreateSignOff.jsx";
import ErrorPage from "./error-page";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
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
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
