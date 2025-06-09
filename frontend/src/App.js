import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Overview from './Overview.js';
import PurchaseStocks from './PurchaseStocks.js';
import SellStocks from './SellStocks.js';
import './App.css';
import './index.css'

function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="logo">StockDash</h2>
      <NavLink to="/overview" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Overview
      </NavLink>
      <NavLink to="/purchase" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Purchase Stocks
      </NavLink>
      <NavLink to="/sell" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Sell Stocks
      </NavLink>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="dashboard">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/purchase" element={<PurchaseStocks />} />
            <Route path="/sell" element={<SellStocks />} />
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
