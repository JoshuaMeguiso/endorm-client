import { useState } from 'react'
import { useLogout } from '../hooks/useLogout';

export const useChangePassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { logout } = useLogout();

  const change_Pass = async (user_Name, password, password1) => {
    setIsLoading(true)
    setError(null)
    
    if(password === '' || password1 === ''){
      setIsLoading(false)
      setError('All fields must be filled')
    }
    else{
      if(password === password1){
        const response = await fetch('/user/login/update', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ user_Name, password })
          })
        const json = await response.json()
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
          // update loading state
          setIsLoading(false)
          logout()
        }
      }
      else{
        setIsLoading(false)
        setError('Password Does not Match')
      }
    }
  }

  return { change_Pass, isLoading, error }
}