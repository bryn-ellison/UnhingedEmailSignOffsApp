import { useState, useEffect, useCallback } from "react";
import { fetcherWithAxios } from "./FetchWithAxios";
import Typewriter from "./TypeWriter";
import GetNewSignOffButton from "./GetNewSignOffButton";
import { GoCopy } from "react-icons/go";
import NavigateButton from "./NavigateButton";

const SignOff = () => {
  const [signOffData, setSignOffData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [finishedTyping, setFinishedTyping] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const fetchSignOffData = async () => {
    try {
      const response = await fetcherWithAxios(
        `https://unhingedemailsignoffwebapi.azurewebsites.net/api/signoffs`
      );
      setSignOffData(response);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSignOffData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSignOffData();
  }, []);

  const handleFinishedtyping = (bool) => {
    setFinishedTyping(bool);
  };

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(signOffData.signOff);
      setCopySuccess(true);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  const handleReset = () => {
    setFinishedTyping(false);
    setSignOffData(null);
    setCopySuccess("");
    fetchSignOffData();
  };

  const DisplayAuthor = () => {
    if (finishedTyping === false) {
      return;
    } else if (copySuccess !== "") {
      return <p>{signOffData.author}</p>;
    } else {
      return (
        <Typewriter
          text={signOffData.author}
          speed={45}
          handleFinishedtyping={handleFinishedtyping}
        />
      );
    }
  };
  {
  }
  return (
    <div className="content-container">
      <div className="signOff-container">
        <p>
          Hate your job and want to get fired? Workmates all younger and
          therefore cooler than you? Use the sign off below on your next
          life-sapping email exchange and reap the inevitable benefits.
        </p>
        {loading && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {signOffData && (
          <Typewriter
            text={signOffData.signOff}
            speed={45}
            handleFinishedtyping={handleFinishedtyping}
          />
        )}
        <DisplayAuthor />
        <button
          className="copy-btn"
          style={{
            backgroundColor: copySuccess ? "#ffc8d1" : "whitesmoke",
            color: copySuccess ? "whitesmoke" : "black",
          }}
          onClick={copyToClipBoard}
        >
          <GoCopy />
        </button>
      </div>
      <div className="buttons-container">
        <GetNewSignOffButton handleFinishedtyping={handleReset} />
        <NavigateButton page={"/create"} buttonText={"Add your own"} />
      </div>
    </div>
  );
};

export default SignOff;
