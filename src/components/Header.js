import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode,toggleSidebar }) => {
  return (
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
  );
};

export default Header;
