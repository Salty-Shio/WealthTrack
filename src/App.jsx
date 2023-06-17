import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'jotai';

import BudgetSelection from './components/BudgetSelection';
import BudgetAllotment from './components/BudgetAllotment';
import EnvelopeView from './components/EnvelopeView';
import NavigationBar from './components/NavigationBar';

import './css/app.css';


function App() {
    return (
      <div className="App">
        <Provider>
        <BrowserRouter>
        <NavigationBar className="nav" />
          <Routes>
            <Route path="/" element={<BudgetSelection />} />
            <Route path="/allotment" element={<BudgetAllotment />} />
            <Route path="/envelopes" element={<EnvelopeView />} />
          </Routes>
        </BrowserRouter>
        </Provider>
      </div>
    );
}

export default App;
