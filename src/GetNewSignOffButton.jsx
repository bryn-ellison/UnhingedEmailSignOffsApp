const getNewButton = ({handleFinishedtyping}) => {

    function handleButtonClick() {
        handleFinishedtyping(false)
    }

    return (
        <button onClick={handleButtonClick}>Again</button>
    )
}

export default getNewButton;