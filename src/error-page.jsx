import { useRouteError } from "react-router-dom";
import NavigateButton from "./NavigateButton";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="signOff-container">
      <h3>Oops!</h3>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <NavigateButton page={"/"} buttonText={"Go back"} />
    </div>
  );
}
