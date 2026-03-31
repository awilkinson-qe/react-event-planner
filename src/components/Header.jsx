// Navigation bar and hero banner shown across the app
import { NavLink, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../context/UserContextValue";

export default function Header() {
  // Get current user and logout function
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="app-navbar"
      >
        <Container fluid="lg">
          <Navbar.Brand as={Link} to="/" className="brand">
            Timeline
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-lg-center">
              {/* Show different links depending on login state */}
              {user && (
                <>
                  <Nav.Link as={NavLink} to="/" end>
                    Dashboard
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/add-event">
                    Add Event
                  </Nav.Link>

                  <Nav.Link as={NavLink} to="/help">
                    Help
                  </Nav.Link>

                  <Nav.Link onClick={logout} className="nav-logout">
                    Logout
                  </Nav.Link>
                </>
              )}

              {!user && (
                <>
                  <Nav.Link as={NavLink} to="/login">
                    Login
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/register">
                    Register
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/help">
                    Help
                  </Nav.Link>
                </>
              )}
            </Nav>

            {user && (
              <span className="user-badge">
                Signed in as: {user.name || user.email}
              </span>
            )}
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