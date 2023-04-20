import { useState } from 'react'

export const useRegisterCard = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const registerCard = async (tenant_ID, uid) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`/user/${tenant_ID}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ uid })
    })
    const json = await response.json()
    if (response.ok) {
        setIsLoading(false)
    }
    else{
    setIsLoading(false)
    setError(json.error)
    }
  }

  return { registerCard, isLoading, error}
}