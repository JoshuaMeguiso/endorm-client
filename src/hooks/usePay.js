import { useState } from 'react'

export const usePay = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

    const Payment = async (id, amount_Paid) => {
        setIsLoading(true)
        setError(null)
        
        if(id === '' || amount_Paid === ''){
            setIsLoading(false)
            setError('All fields must be filled')
        }
        else{
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
            if (response.ok) {
                setIsLoading(false)
            }
        }
    }
    return { Payment, isLoading, error }
}