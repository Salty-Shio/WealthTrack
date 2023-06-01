import React from "react";
import "../css/navigation.css";
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();


    return (
        <div className="nav_bar">
            <nav>
                <div> Logo? </div>
                <ul>
                    <li onClick={() => {navigate('/')}}>Create Budget</li>
                    <li onClick={() => {navigate('/allotment')}}>Allot Money</li>
                    <li onClick={() => {navigate('/envelopes')}}>Record Transaction</li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationBar;