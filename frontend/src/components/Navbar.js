// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap'; // Import Bootstrap Dropdown

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSelect = (eventKey) => {
    // Navigate to the respective page based on dropdown selection
    navigate(eventKey);
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Flat Rental
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {/* If user is logged in, show User Profile, Dashboard, and Logout */}
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Dropdown onSelect={handleSelect}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      User Profile
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item eventKey="/profile">My Profile</Dropdown.Item>
                      <Dropdown.Item eventKey="/my-lists">My Lists</Dropdown.Item>
                      <Dropdown.Item eventKey="/favourites">Favourites</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  {/* <Link className="nav-link" to="/profile">
                    User Profile
                  </Link> */}
                </li>
                <li className="nav-item">
                  <button className="btn btn-secondary nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              // If user is not logged in, show Login and Sign Up
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
