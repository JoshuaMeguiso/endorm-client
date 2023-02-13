import { useState } from "react"
import { useChangePassword } from "../hooks/useChangePassword"
import { useAuthContext } from "../hooks/useAuthContext"
import { useNavigate } from 'react-router-dom'

const Setting = () => {
    const [password, setPassword] = useState('')
    const [password1, setPassword1] = useState('')
    const { change_Pass, isLoading, error } =  useChangePassword()
    const { user } = useAuthContext()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        await change_Pass(user.user_Name, password, password1)
    }

    return (
        <div className="tenant-details">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1>
                        Change Password
                    </h1>
                    <label>
                        <br/>
                        <h2>
                            User Name: 
                        </h2>
                    </label>
                    <input
                        type="username" 
                        disabled
                        value={user.user_Name} 
                    />
                    <label>
                        <h2>
                            Change Password: 
                        </h2>
                    </label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                    />
                    <label>
                        <h2>
                            Confirm Password: 
                        </h2>
                    </label>
                    <input 
                        type="password" 
                        onChange={(e) => setPassword1(e.target.value)} 
                        value={password1} 
                    />
                    <button className="btnPassword" disabled={isLoading}>
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

export default Setting