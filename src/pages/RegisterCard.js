import { useNavigate } from 'react-router-dom'

const RegisterCard = () => {
    const navigate = useNavigate();

    return (
        <form className="tenant-details">
            <h2>
                <p>
                    <strong>
                        &emsp;&emsp;&emsp;&emsp;&emsp;&ensp;TAP YOUR CARD
                    </strong>
                </p>
            </h2>
            <div className="logoHome">
                <i className="fa-regular fa-address-card"></i>
            </div>
            <button className="btnPassword" type="button" onClick={() => navigate(-1)}>
                <strong>
                    Cancel
                </strong>
            </button>
        </form>
    )
}

export default RegisterCard