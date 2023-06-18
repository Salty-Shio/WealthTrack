import React, {useState} from "react";
import "../css/login.css"
import { useAuth } from "../database/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = ({setLoggedIn}) => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { signup, login, currentUser } = useAuth();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password);
            navigate("/");
        }
        catch {
            setError('Failed to create an account')
        }

        setLoading(false);
    }

    const handleLogin = async () => {
        try {
            setError('');
            setLoading(true);
            await login(email, password);
            navigate('/');
        }
        catch {
            setError('Failed to sign in')
        }

        setLoading(false);
    }

    // Reset the fields and toggle.
    const handleToggle = () => {
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setError("");
        setToggleLogin(!toggleLogin)
    }
    return (
        <div className="authentication">
            {toggleLogin && (
                <div className="authContainer">
                    <h1>Login</h1>
                    <section>
                        <label>Email</label>
                        <input type="text" required value={email} onChange={handleEmailChange} placeholder="Email" />
                        <label>Password</label>
                        <input type="password" required value={password} onChange={handlePasswordChange} placeholder="Password"/>
                        <div className="buttonGroup">
                            <button disabled={loading} onClick={handleToggle}>To Register</button>
                            <button disabled={loading} onClick={handleLogin}>Login</button>
                        </div>
                        {error && <p className="alert">{error}</p>}
                    </section>
                </div>
            )}
            {!toggleLogin && (
                <div className="authContainer">
                    <h1>Register</h1>
                    <section>
                        <label>Email</label>
                        <input type="text" required value={email} onChange={handleEmailChange} placeholder="Email" />
                        <label>Password</label>
                        <input type="password" required value={password} onChange={handlePasswordChange} placeholder="Password"/>
                        <label>Confirm Password</label>
                        <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} placeholder="Confirm Password"/>
                        <div className="buttonGroup">
                            <button disabled={loading} onClick={handleToggle}>To Login</button>
                            <button disabled={loading} onClick={handleRegister}>Register</button>
                        </div>
                        {error && <p className="alert">{error}</p>}
                    </section>
                </div>
            )}
        </div>
    );
}

export default LoginPage;