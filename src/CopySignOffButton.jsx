import { GoCopy } from "react-icons/go";

const copyButton = ({ copyToClipBoard }) => {
  return (
    <button className="copy-btn" onClick={copyToClipBoard}>
      <GoCopy />
    </button>
  );
};

export default copyButton;
