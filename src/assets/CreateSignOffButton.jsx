const createNewButton = () => {

    function handleButtonClick() {
        console.log("MOO")
    }

    return (
        <button className="ui-btn" onClick={handleButtonClick}>Add your own</button>
    )
}

export default createNewButton;