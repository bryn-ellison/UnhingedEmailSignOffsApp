import { useNavigate } from 'react-router-dom';
const createNewButton = ({page, buttonText}) => {

    const navigate = useNavigate(page, buttonText);
    return (
        <button className="ui-btn" onClick={() => navigate(page)}>{buttonText}</button>
    )
}

export default createNewButton;