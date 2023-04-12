import { useState } from 'react'

export const usePay = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

    const Payment = async (id, amount_Paid, compareAmount) => {
        setIsLoading(true)
        setError(null)
        
        if(id === '' || amount_Paid === '' || compareAmount === ''){
            setIsLoading(false)
            setError('All fields must be filled')
        }
        else{
            if(parseInt(amount_Paid) >= parseInt(compareAmount)){
                const response = await fetch(`/transaction/${id}`, {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ amount_Paid })
                })
                const json = await response.json()
                if (!response.ok) {
                    setIsLoading(false)
                    setError(json.error)
                }
                else{
                    setIsLoading(false)
                }
            }   
            else{
                setIsLoading(false)
                setError('Did not Reach the Minimum Amount')
            }
        }
    }
    return { Payment, isLoading, error }
}