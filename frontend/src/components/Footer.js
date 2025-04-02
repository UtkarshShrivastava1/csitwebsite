import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          {/* About Section */}
          <Col md={4} className="footer-section"></Col>

          {/* Quick Links Section */}
          <Col md={4} className="footer-section">
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="/terms">Terms of Service</a>
              </li>
            </ul>
          </Col>

          {/* Contact Section */}
          <Col md={4} className="footer-section">
            <h5>Contact Us</h5>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt /> Shivaji Nagar, Balod Road Durg, Chhattisgarh
                491001
              </li>
              <li>
                <FaPhone />
                +91-8966000059, +91-8966000102
              </li>
              <li>
                <FaEnvelope />
                registrar@csitdurg.in, info@csitdurg.in
              </li>
            </ul>
          </Col>
        </Row>

        {/* Social Media Links */}
        <Row className="footer-social">
          <Col className="text-center">
            <a
              href="https://www.facebook.com/csgidurg.in"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a href="https://zager.in/" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/csgidurg/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://in.linkedin.com/in/chhatrapati-shivaji-group-of-institutions-durg-9909173b/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedinIn />
            </a>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="text-center mt-4">
          <Col>
            <p>
              &copy; {new Date().getFullYear()} School Management System. All
              rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
