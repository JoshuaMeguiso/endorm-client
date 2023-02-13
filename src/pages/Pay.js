import { useState, useEffect } from "react"
import { useTransactionsContext } from  '../hooks/useTransactionsContext'
import { useNavigate } from 'react-router-dom'
import { usePay } from '../hooks/usePay'
import { useAuthContext } from '../hooks/useAuthContext'

const Pay = () => {
    const { transactions, dispatch } = useTransactionsContext()
    const { user } = useAuthContext()
    const [cash, setCash] = useState('')
    const { Payment, isLoading, error } =  usePay()
    const navigate = useNavigate();
    const cashRemaining = parseFloat(transactions[0].total_Amount) - cash

    const handleSubmit = async (e) => {
        e.preventDefault()
        await Payment(transactions[0]._id, cash)
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

    return (
        <div className="tenant-details">
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
                                Total Cash Inserted: 
                            </strong>
                        </h2>
                    </label>
                    <input 
                        type="float" 
                        onChange={(e) => setCash(e.target.value)} 
                        value={cash} 
                    />
                    <button className="btnPassword" disabled={isLoading} onClick={() => navigate(-1)}>
                        <strong>
                            Confirm
                        </strong>
                    </button>
                    <button className="btnPassword" type="button" onClick={() => navigate(-1)}>
                        <strong>
                            Cancel
                        </strong>
                    </button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div> 
        </div>
    )
} 

export default Pay