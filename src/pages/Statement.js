import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import StatementDetails from '../components/statementDetails'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from  '../hooks/useTransactionsContext'

const Statement = () => {
    const { transactions, dispatch } = useTransactionsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();

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
        <>
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