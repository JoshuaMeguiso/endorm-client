import { useNavigate } from 'react-router-dom'

const LoginCard = () => {
    const navigate = useNavigate();

    return (
        <form className="login">
            <h1>
                &emsp;&emsp;&nbsp;TAP YOUR CARD
            </h1>
            <div className="logoHome">
                <i class="fa-regular fa-address-card"></i>
            </div>
            <button className="btnPassword" type="button" onClick={() => navigate(-1)}>
                <strong>
                    Return
                </strong>
            </button>
        </form>
    )
}

export default LoginCard