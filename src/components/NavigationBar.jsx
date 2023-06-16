import React from "react";
import "../css/navigation.css";
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();

    return (
        <div className="nav_bar">
            <nav>
                <img src="../images/logo.png" alt="Logo with dollar bills in envelope" />
                <h3>Navigation</h3>
                <ul>
                    <li onClick={() => { navigate('/') }}><p>Create Budget</p></li>
                    <li onClick={() => { navigate('/allotment') }}><p>Allot Money</p></li>
                    <li onClick={() => { navigate('/envelopes') }}><p>Record Transaction</p></li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;