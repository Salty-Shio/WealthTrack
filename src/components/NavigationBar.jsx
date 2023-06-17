import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import "../css/navigation.css";

const NavigationBar = () => {
    const navigate = useNavigate();

    return (
        <div className="nav_bar">
            <nav>
                <img src={logo} alt="Logo with dollar bills in envelope" />
                <h3>Wealthtrack</h3>
                <ul>
                    <li onClick={() => { navigate('/') }}><p>Select Budget</p></li>
                    <li onClick={() => { navigate('/allotment') }}><p>Allot Money</p></li>
                    <li onClick={() => { navigate('/envelopes') }}><p>Record Transaction</p></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;