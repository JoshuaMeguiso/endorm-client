import { useNavigate } from 'react-router-dom'
import { useRegisterCard } from '../hooks/useRegisterCard';
import { useEffect } from 'react';
import { useTenantsContext } from "../hooks/useTenantsContext"

const RegisterCard = () => {
    const navigate = useNavigate();
    const { registerCard, isLoading, error } = useRegisterCard()
    const { tenants } = useTenantsContext()

    console.log(tenants[0].tenant_ID);
    useEffect(() => {
        const fetchUid = async () => {
          const response = await fetch('http://127.0.0.1:8000/uid');
          const data = await response.json();
          registerCard(tenants.tenant_ID, data)
        };
        fetchUid();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <form className="tenant-details">
                <h2>
                    <p>
                        <strong>
                            &emsp;&emsp;&emsp;&ensp;&nbsp;TAP YOUR CARD
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
            {isLoading ? (
                <div className="loginLoader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
            {error && <div className="error">{error}</div>}
        </>
    )
}

export default RegisterCard