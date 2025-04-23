import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = ({ darkMode, toggleDarkMode }) => {
  return (
    <Navbar
      bg={darkMode ? 'dark' : 'light'}
      variant={darkMode ? 'dark' : 'light'}
      expand="lg"
      className="shadow"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          💰 CryptoViz
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-3">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
          </Nav>

          <Button
            variant={darkMode ? 'outline-light' : 'outline-dark'}
            onClick={toggleDarkMode}
          >
            {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
