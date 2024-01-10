import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import Navbar from './components/common/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Footer from './components/common/Footer/Footer';
import LoginPage from './components/LoginPage/LoginPage';
import DashboardPage from './components/DashboardPage/DashboardPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} /> {/* Dashboard route */}
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
