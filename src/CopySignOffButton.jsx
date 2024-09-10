const copyButton = (textToCopy) => {
    function handleButtonClick(textToCopy) {
        navigator.clipboard.writeText(textToCopy.text)
    }

    return (
        <button onClick={handleButtonClick(textToCopy)}>Copy</button>
    )
}

export default copyButton;