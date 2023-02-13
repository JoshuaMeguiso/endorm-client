import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } =  useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(userName, password)
    }

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h1>
                Log In
            </h1>
            <label>
                <h2>
                    User Name: 
                </h2>
            </label>
            <input 
                type="username" 
                onChange={(e) => setUsername(e.target.value)} 
                value={userName} 
            />
            <label>
                <h2>
                    Password: 
                </h2>
            </label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <button className="btnPassword" disabled={isLoading}>
                <strong>
                    Log in
                </strong>
            </button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Login