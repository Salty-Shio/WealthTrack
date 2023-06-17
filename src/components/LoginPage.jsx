import React, {useState} from "react";
// import { newUser, getUser } from "../database/dbFunctions";

const LoginPage = ({setLoggedIn}) => {
    const [toggleLogin, setToggleLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleRegister = async () => {
        console.log(`Register user with username ${username} and password ${password}`);
        let response = await newUser(username, password);
        console.log(response);
    }
    const handleLogin = () => {
        console.log(`Logging in as user with username ${username} and password ${password}`);
        // attempt to log in, and if successful, navigate to the rest of the app
        setLoggedIn(true);
        localStorage.setItem('loggedIn', JSON.stringify({
            username,
            password
        }))
        
    }

    return (
        <div>
            {toggleLogin && (
                <div>
                    <h2>Login</h2>
                    <div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={handleUsernameChange} />
                        <label>Password</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={() => setToggleLogin(!toggleLogin)}>Register</button>
                    </div>
                </div>
            )}
            {!toggleLogin && (
                <div>
                    <label>Username</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    <button onClick={handleRegister}>Register</button>
                    <button onClick={() => setToggleLogin(!toggleLogin)}>Login</button>
                </div>
            )}
        </div>
    );
}

export default LoginPage;