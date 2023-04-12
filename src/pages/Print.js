import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Print = () => {
    const [seconds, setSeconds] = useState(6);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);
    
    //After 
    useEffect(() => {
        const postString = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/send_string', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ command_string: "TEST" }),
                });
                const data = await response.json();
                console.log(data.message);
            } catch (error) {
            console.error(error);
            }
        }
        if (seconds === -1) {
          navigate(-1);
        }
        if(seconds === 5){
            postString();
        }
    }, [seconds, navigate]);

    return (
        <>
            {seconds === 0 ? (
                <div className="loader-container"> 
                    <div className="success-checkmark">
                        <div className="check-icon">
                            <span className="icon-line line-tip"></span>
                            <span className="icon-line line-long"></span>
                            <div className="icon-circle"></div>
                            <div className="icon-fix"></div>
                        </div>
                    </div> 
                </div>  
            ) : (
                <div className='tenant-details'>
                    <p>
                        <strong>
                            Please wait, the system is now printing 
                        </strong>
                    </p>
                    <p>
                        <strong>
                            Seconds remaining: {seconds-1}
                        </strong>
                    </p>
                </div>
            )}       
        </>
    )
} 

export default Print