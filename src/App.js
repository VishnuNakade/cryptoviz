import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import { Container, Navbar, Button } from 'react-bootstrap';
import Sidebar from './components/Sidebar'; // Import Sidebar component
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        {/* Header/Navbar */}
        <Navbar
          bg={darkMode ? 'dark' : 'light'}
          variant={darkMode ? 'dark' : 'light'}
          expand="lg"
          className="shadow-sm"
          sticky="top"
        >
          <Container fluid>
            <Button variant="outline-secondary" onClick={toggleSidebar}>
              ☰
            </Button>
            <Navbar.Brand as={Link} to="/" className="ms-3 fw-bold">
              💰 CryptoViz
            </Navbar.Brand>
            <Button
              variant={darkMode ? 'outline-light' : 'outline-dark'}
              onClick={toggleDarkMode}
              className="ms-auto"
            >
              {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
            </Button>
          </Container>
        </Navbar>

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
