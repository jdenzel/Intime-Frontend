import { useState } from 'react'
import LoginForm from '../components/LoginForm'
import SignUpForm from '../components/SignUpForm';

function Login({ onLogin }) {

    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
        {showLogin ? (
            <div>
                <LoginForm onLogin={onLogin} />
                <p>Don't have an account?</p>
                <button onClick={() => setShowLogin(false)}>Sign Up</button>
            </div>
            
        ) : (
            <div>
                <SignUpForm onLogin={onLogin} />
                <p>Already have an account?</p>
                <button onClick={() => setShowLogin(true)}>Log In</button>
            </div>
        )}
    </div>
    )
}

export default Login;