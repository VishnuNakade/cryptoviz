import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import { Container, Navbar, Button } from 'react-bootstrap';
import Sidebar from './components/Sidebar'; // Import Sidebar component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        {/* Header/Navbar */}
        <Header toggleSidebar={toggleSidebar} toggleDarkMode={toggleDarkMode} darkMode={darkMode}/>

        {/* Sidebar Component */}
        <Sidebar showSidebar={showSidebar} toggleSidebar={toggleSidebar} />

        {/* Page Content */}
        <Container fluid className="py-3">
        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <Home />
              </ErrorBoundary>
            }
          />
          <Route
            path="/coin/:id"
            element={
              <ErrorBoundary>
                <CoinPage />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Container>
      </Router>
    </div>
  );
}

export default App;
