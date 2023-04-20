import { useNavigate } from 'react-router-dom'
import { useRegisterCard } from '../hooks/useRegisterCard';
import { useEffect, useState } from 'react';

const RegisterCard = () => {
    const navigate = useNavigate();
    const [ uid, setUid ] = useState("");
    const { registerCard, isLoading, error } = useRegisterCard()

    useEffect(() => {
        const fetchUid = async () => {
          const response = await fetch('http://127.0.0.1:8000/uid');
          const data = await response.json();
          setUid(data);
          if(uid){
            await registerCard(uid);
          }
        };
        const intervalId = setInterval(fetchUid, 2000); // Fetch credits every 2 seconds
    
        return () => clearInterval(intervalId); // Clean up the interval on component unmount
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