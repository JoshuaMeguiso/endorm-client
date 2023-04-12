import { useState, useEffect } from "react"
import { useTransactionsContext } from  '../hooks/useTransactionsContext'
import { useNavigate } from 'react-router-dom'
import { usePay } from '../hooks/usePay'
import { useAuthContext } from '../hooks/useAuthContext'

const Pay = () => {
    const { transactions, dispatch } = useTransactionsContext()
    const [showForm, setShowForm] = useState(false);
    const [ compareCash, setCompareCash ] = useState('')
    const [credits, setCredits] = useState(0);

    const { Payment, isLoading, error } =  usePay()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const cashRemaining = parseFloat(transactions[0].total_Amount) - credits

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Payment(transactions[0]._id, credits, compareCash)
    }

    useEffect(() => {
        const fetchStatements = async () => {
            const response = await fetch(`/transaction/${user.user_Name}/false`)
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_TRANSACTIONS', payload: json})
            }
        }
        fetchStatements();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        const fetchCredits = async () => {
          const response = await fetch('http://127.0.0.1:8000/credits');
          const data = await response.json();
          setCredits(prevCredits => prevCredits + parseInt(data?.value || 0));
        };
    
        const intervalId = setInterval(fetchCredits, 2000); // Fetch credits every 2 seconds
    
        return () => clearInterval(intervalId); // Clean up the interval on component unmount
    }, []);
    
    

    return (
        <div className="tenant-details">
            {isLoading ? (
                <div className="loader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1>
                        Payment
                    </h1>
                    <label>
                        <br/><h2>
                            <strong>
                                Amount Due: 
                            </strong>
                        </h2>
                    </label>
                    <input
                        type="float" 
                        disabled
                        value={cashRemaining.toFixed(2)} 
                    />
                    <label>
                        <h2>
                            <strong>
                                Insert Money to Pay
                            </strong>
                        </h2>
                    </label>
                    <input 
                        disabled = {showForm}
                        type="float" 
                        onChange={(e) => setCompareCash(e.target.value)} 
                        value={compareCash} 
                    />
                    {!showForm && (
                        <>
                            <button className="smallBtn" disabled={isLoading} onClick={() => setShowForm(true)}>
                                <strong>
                                    Confirm
                                </strong>
                            </button>
                            <button className="smallBtn" type="button" onClick={() => navigate(-1)}>
                                <strong>    
                                    Cancel
                                </strong>
                            </button>
                        </>
                    )}
                    {showForm && (
                        <>
                            <label htmlFor="credits">
                                <h2>
                                    <strong>
                                        Total Cash Inserted: 
                                    </strong>
                                </h2>
                            </label>
                            <input 
                                type="number" 
                                id="credits" 
                                name="credits" 
                                value={credits} 
                                readOnly 
                            />
                            <button className="smallBtn" disabled={isLoading}>
                                <strong>
                                    Confirm
                                </strong>
                            </button>
                            <button className="smallBtn" type="button" onClick={() => navigate(-1)}>
                                <strong>    
                                    Cancel
                                </strong>
                            </button>
                        </>
                    )}
                    {error && <div className="error">{error}</div>}
                </form>
            </div> 
        </div>
    )
} 

export default Pay