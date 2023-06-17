import React, {useState, useEffect} from 'react';
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
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
      if (localStorage.getItem("loggedIn")) {
          // verify credentials, and if successful, set loggedIn to true.
          setLoggedIn(true);
      }
    }, [])
    
    return (
      <div className="App">
        <Provider>
        <BrowserRouter>
        <NavigationBar className="nav" />
          <Routes>
            <Route path="/" element={loggedIn ? <BudgetSelection /> : <Navigate to="/login" />} exact />
            <Route path="/login" element={<LoginPage setLoggedIn={setLoggedIn} />} />
            <Route path="/allotment" element={loggedIn ? <BudgetAllotment /> : <Navigate to="/login" />} />
            <Route path="/envelopes" element={loggedIn ? <EnvelopeView /> : <Navigate to="login" />} />
            <Route path="*" element={loggedIn ? <NotFound /> : <Navigate to="login" />} />
          </Routes>
        </BrowserRouter>
        </Provider>
      </div>
    );
}

export default App;
