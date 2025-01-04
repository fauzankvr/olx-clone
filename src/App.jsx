import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from "./Pages/Signup"

import Home from './Pages/Home';
// import Create from './Components/Create/Create';
import Sellform from "./Components/Sellform/Sellform"
import View from './Components/View/View';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create" element={<Sellform />} />
        <Route path="/details/:id" element={<View />} />
      </Routes>
    </div>
  );
}

export default App;
