import { GoCopy } from "react-icons/go";

const copyButton = ({copyToClipBoard, text}) => {

return (
    <button className="copy-btn" onClick={() => copyToClipBoard(text)}>
        <GoCopy />
    </button>
)
}

export default copyButton;