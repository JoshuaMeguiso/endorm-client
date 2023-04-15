import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactionsContext } from  '../hooks/useTransactionsContext'
import { add, format } from 'date-fns'

const Print = () => {
    const { transactions } = useTransactionsContext()
    const [seconds, setSeconds] = useState(6);
    const navigate = useNavigate();
    const end_Month = add(new Date(transactions[0].start_Month), {months: 1})

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
                  body: JSON.stringify({ 
                        command_string: `1|${transactions[0].tenant_Name}|${transactions[0].tenant_ID}|${transactions[0].room_ID}|${format(new Date(transactions[0].start_Month), 'MMMM dd, Y')} - ${format(end_Month, 'MMMM dd, Y')}|${parseFloat(transactions[0].room_Rate).toFixed(2)}|${parseFloat(transactions[0].water_Charge).toFixed(2).toString()}|${transactions[0].previous_Reading}|${transactions[0].present_Reading}|${transactions[0].total_Consume}|${parseFloat(transactions[0].room_Consume).toFixed(2)}|${parseFloat(transactions[0].individual_Consume).toFixed(2)}|${parseFloat(transactions[0].total_Amount).toFixed(2)}\x0D` 
                    }),
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
        // eslint-disable-next-line
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