import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StatementDetails from '../components/statementDetails'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from  '../hooks/useTransactionsContext'

const Statement = () => {
    const { transactions, dispatch } = useTransactionsContext()
    const [loading, setLoading] = useState(false);
    const { user } = useAuthContext()
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatements = async () => {
            setLoading(true);
            const response = await fetch(`/transaction/${user.user_Name}/false`)
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_TRANSACTIONS', payload: json})
                setLoading(false);
            }
        }
        fetchStatements();
        // eslint-disable-next-line
    }, [])
    
    return (
        <>
            {!transactions && loading ? (
                <div className="loader-container">
                <div className="spinner"></div>
                </div>
            ) : (
                ""
            )}
            {transactions && transactions.map((statement) => (
                <div key={statement._id}>
                    <StatementDetails 
                        key={statement._id} 
                        statement={statement} 
                    />
                    <button className='btnPay' onClick={() => navigate('pay')}>
                        <i className="fa-solid fa-money-bills"></i>
                        <strong> Pay </strong>
                    </button>
                    <button className='btnPay' onClick={() => navigate('print')}>
                        <i className="fa-sharp fa-solid fa-receipt"></i>
                        <strong> Print</strong>
                    </button>
                </div>
            ))}
            {transactions && (
                <>
                    {!transactions[0] && (
                        <div className='tenant-details'>
                            <p><strong>No Statement of Account</strong></p>
                        </div>
                    )}
                </>
            )}

        </>
    )
} 

export default Statement