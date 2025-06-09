import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import Overview from './Overview';
import PurchaseStocks from './PurchaseStocks';
import SellStocks from './SellStocks';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import './App.css';
import './index.css';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('authenticated');
    const storedUser = localStorage.getItem('user');
    if (auth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <div className="dashboard">
        {isAuthenticated && <Sidebar />}

        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/overview" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Overview user={user} />
              </ProtectedRoute>
            } />
            <Route path="/purchase" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PurchaseStocks user={user} />
              </ProtectedRoute>
            } />
            <Route path="/sell" element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <SellStocks user={user} />
              </ProtectedRoute>
            } />

            {/* Always redirect root path to /login */}
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Catch-all */}
            <Route path="*" element={<h2>404 - Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
