import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import axios from "axios"; // Import axios
import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css"; // Ensure custom CSS exists

const NavBar = ({ isLoggedIn, userRole, handleLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_URL =
    process.env.REACT_APP_NODE_ENV === "production"
      ? process.env.REACT_APP_PRODUCTION_URL // Production API URL
      : process.env.REACT_APP_DEVELOPMENT_URL; // Local development API URL

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isLoggedIn) return; // If not logged in, no need to fetch data

      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Authentication token is missing.");
        setLoading(false);
        return;
      }
      try {
        let response;
        if (userRole === "admin") {
          response = await axios.get(
            `${API_URL}/api/admin/auth/adminprofile`, // Admin endpoint
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        const fetchedData = response.data[userRole]; // Adjust based on the actual response format
        setUser(fetchedData);
      } catch (err) {
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Fetch data when the component mounts
  }, [isLoggedIn, userRole, API_URL]); // Re-run if `isLoggedIn` or `userRole` changes

  // Handle login button
  const handleLoginClick = () => {
    navigate("admin-login");
  };

  // Handle profile button
  const handleProfileClick = () => {
    if (userRole === "admin") {
      navigate("/admin/profile"); // Navigate to the admin profile page
    }
  };

  return (
    <>
      {/* Banner Section */}
      <div className="banner-section bg-light text-dark py-2 shadow">
        <Container className="d-flex justify-content-between align-items-center">
          {/* Banner Content */}
          <div className="d-flex align-items-center">
            <img
              src="https://csitdurg.in/assets/images/logo_header.png"
              alt="College Logo"
              className="me-3"
              style={{ width: "225px", height: "115px" }} // Slightly smaller logo
            />
            <div>
              <h5 className="mb-0">
                Chhatrapati Shivaji Institute of Technology
              </h5>
              <small className="text-muted">
                Shivaji Nagar, Balod Road Durg, Chhattisgarh 491001
              </small>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <img
              src="https://csitdurg.in/logo/Aicte-logo.png"
              alt="AICTE Logo"
              className="me-2"
              style={{ width: "70px", height: "70px" }}
            />
            <img
              src="https://csitdurg.in/logo/Institutions%20innovation%20council.png"
              alt="Institutions Innovation Council"
              className="me-2"
              style={{ width: "70px", height: "70px" }}
            />
            <img
              src="https://csitdurg.in/logo/ISO_logo.png"
              alt="ISO Certified"
              className="me-2"
              style={{ width: "70px", height: "70px" }}
            />
            <img
              src="https://csitdurg.in/logo/CSVTU.png"
              alt="CSVTU Logo"
              className="me-2"
              style={{ width: "70px", height: "70px" }}
            />
            <img
              src="https://csitdurg.in/logo/dataquest.png"
              alt="DataQuest Logo"
              className="me-2"
              style={{ width: "70px", height: "70px" }}
            />
          </div>

          <Button
            variant="success"
            className="admission-btn"
            onClick={() => navigate("/admissions")}
          >
            Admissions
          </Button>
        </Container>
      </div>

      {/* Fixed Navbar Section */}
      <Navbar
        expand="lg"
        bg="dark"
        variant="dark"
        className="custom-navbar shadow fixed-top"
        sticky="top" // Ensure the navbar stays sticky at the top
      >
        <Container>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className="custom-nav-link">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                About
              </Nav.Link>

              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                Academics
              </Nav.Link>
              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                Admission
              </Nav.Link>
              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                Campus
              </Nav.Link>
              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                Placement
              </Nav.Link>
              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                Alumni
              </Nav.Link>
              <Nav.Link as={Link} to="/about-csgi" className="custom-nav-link">
                Notice
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us" className="custom-nav-link">
                Connect
              </Nav.Link>
              {isLoggedIn && (
                <Nav.Link
                  as={Link}
                  to={
                    userRole === "admin" ? "/admin-dashboard" : "/admin-login"
                  }
                  className="custom-nav-link"
                >
                  Dashboard
                </Nav.Link>
              )}
            </Nav>
            <div className="d-flex align-items-center">
              {!isLoggedIn ? (
                <Button
                  variant="outline-light"
                  className="login-btn me-2"
                  onClick={handleLoginClick}
                >
                  Login
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline-light"
                    className="profile-btn me-2"
                    onClick={handleProfileClick}
                  >
                    {loading
                      ? "Loading..."
                      : `${userRole?.toUpperCase()}: ${
                          user?.name || "Profile"
                        }`}
                  </Button>
                  <Button
                    variant="outline-danger"
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
