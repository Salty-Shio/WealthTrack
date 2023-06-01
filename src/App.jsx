import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BudgetSelection from './components/BudgetSelection';
import BudgetAllotment from './components/BudgetAllotment';
import EnvelopeView from './components/EnvelopeView';
import NavigationBar from './components/NavigationBar';
import './css/app.css';

function App() {
    const [currentBudget, setCurrentBudget] = useState()

    return (
      <div className="App">
        <BrowserRouter>
        <NavigationBar />
          <Routes>
            <Route path="/" element={<BudgetSelection />} />
            <Route path="/allotment" element={<BudgetAllotment />} />
            <Route path="/envelopes" element={<EnvelopeView />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
