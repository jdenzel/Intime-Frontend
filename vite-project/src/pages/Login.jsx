import { useState } from 'react'
import LoginForm from '../components/LoginForm'

function Login({ onLogin }) {

    return (
        <LoginForm onLogin={onLogin} />
    )
}

export default Login;