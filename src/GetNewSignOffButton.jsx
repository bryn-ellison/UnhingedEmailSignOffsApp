const getNewButton = ({handleFinishedtyping}) => {

    function handleButtonClick() {
        handleFinishedtyping(false)
    }

    return (
        <button className="ui-btn" onClick={handleButtonClick}>Again</button>
    )
}

export default getNewButton;