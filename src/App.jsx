import React, {useState, useEffect} from 'react';
import { useAuth } from "./database/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'jotai';

import BudgetSelection from './components/BudgetSelection';
import BudgetAllotment from './components/BudgetAllotment';
import EnvelopeView from './components/EnvelopeView';
import NavigationBar from './components/NavigationBar';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFound';
import './css/app.css';


function App() {
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
      <div className="App">
        {!loading &&
        <Provider>
            <BrowserRouter>
            {currentUser && <NavigationBar className="nav" />}
            <Routes>
                <Route path="/" element={currentUser ? <BudgetSelection /> : <Navigate to="/login" />} exact />
                <Route path="/" element={<BudgetSelection />}/>
                <Route path="/login" element={<LoginPage  />} />
                <Route path="/allotment" element={currentUser ? <BudgetAllotment /> : <Navigate to="/login" />} />
                <Route path="/envelopes" element={currentUser ? <EnvelopeView /> : <Navigate to="login" />} />
                <Route path="*" element={currentUser ? <NotFound /> : <Navigate to="login" />} />
            </Routes>
            </BrowserRouter>
        </Provider>
        }
      </div>
    );
}

export default App;
