import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import "../css/navigation.css";
import { useAuth } from "../database/AuthContext";

const NavigationBar = () => {
    const navigate = useNavigate();
    const [ error, setError ] = useState('');
    const { logout } = useAuth();

    const handleLogout = async () => {
        setError('');

        try {
            await logout();
            navigate("/login");
        } catch {
            setError("Failed to log out")
        }

    }

    return (
        <div className="nav_bar">
            <nav>
                <img src={logo} alt="Logo with dollar bills in envelope" />
                <h3>Wealthtrack</h3>
                <ul>
                    <li onClick={() => { navigate('/') }}><p>Select Budget</p></li>
                    <li onClick={() => { navigate('/allotment') }}><p>Allot Money</p></li>
                    <li onClick={() => { navigate('/envelopes') }}><p>Record Transaction</p></li>
                    <li onClick={handleLogout}><p>Logout</p></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;