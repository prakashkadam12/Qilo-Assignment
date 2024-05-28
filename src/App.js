import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../src/pages/dashboard';
import Home from './pages/Home';
import './index.css';
import Navbar from './components/Navbar';


const App = () => (
  <div className="min-h-screen bg-gray-100">
  <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </div>
);

export default App;
