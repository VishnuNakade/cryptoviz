import React from 'react';
import { Link } from 'react-router-dom';
import { Offcanvas, Nav } from 'react-bootstrap';
import News from '../components/News';

const Sidebar = ({ showSidebar, toggleSidebar }) => {
  return (
    <Offcanvas show={showSidebar} onHide={toggleSidebar} backdrop scroll>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>News</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" onClick={toggleSidebar}>
            Home
          </Nav.Link>
          {/* <Nav.Link as={Link} to="/coin/:id" onClick={toggleSidebar}>
            Coin Details
          </Nav.Link> */}
          {/* Add more links as required */}
          <News />
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
