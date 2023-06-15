import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAtom } from 'jotai';
import { budgetAtom } from './atoms';

import BudgetSelection from './components/BudgetSelection';
import BudgetAllotment from './components/BudgetAllotment';
import EnvelopeView from './components/EnvelopeView';
import NavigationBar from './components/NavigationBar';

import './css/app.css';


function App() {
    const [budget, setBudget] = useAtom(budgetAtom);

    return (
      <div className="App">
        <BrowserRouter>
        <NavigationBar className="nav" />
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
