import { useState, useEffect } from "react";

const typeEffect = (text = "", speed = 50, handleFinishedtyping) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.substring(0, i + 1));
        i++;
      } else {
        handleFinishedtyping(true);
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

const UseTypeEffect = ({ text, speed, handleFinishedtyping }) => {
  const displayText = typeEffect(text, speed, handleFinishedtyping);
  return <p>{displayText}</p>;
};

export default UseTypeEffect;
