// Navigation bar and hero banner shown across the app
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContextValue";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        sticky="top"
        className="app-navbar"
        expanded={expanded}
        onToggle={setExpanded}
      >
        <Container fluid="lg">
          <Navbar.Brand as={Link} to="/" className="brand" onClick={closeMenu}>
            Timeline
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center">
              {user ? (
                <>
                  <Nav.Link as={NavLink} to="/" end onClick={closeMenu}>
                    Dashboard
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/add-event" onClick={closeMenu}>
                    Add Event
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/help" onClick={closeMenu}>
                    Help
                  </Nav.Link>

                  <Nav.Link onClick={handleLogout} className="nav-logout">
                    Logout
                  </Nav.Link>

                  <Navbar.Text className="user-badge ms-lg-3">
                    Signed in as: {user.name || user.email}
                  </Navbar.Text>
                </>
              ) : (
                <>
                  <Nav.Link as={NavLink} to="/login" onClick={closeMenu}>
                    Login
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/register" onClick={closeMenu}>
                    Register
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/help" onClick={closeMenu}>
                    Help
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="header-hero">
        <div className="hero-content">
          <h1>Plan Your Events</h1>
          <p>Organise meetings, travel, and more in one place</p>
        </div>
      </div>
    </>
  );
}