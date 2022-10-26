import React, { useContext, useState } from "react";
import { Button, Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { FaBars, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "./images/coding_shikhi.png";
import DarkModeToggle from "react-dark-mode-toggle";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(() => false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  return (
    <Navbar
      collapseOnSelect
      className="mb-4"
      expand="lg"
      bg="light"
      variant="light"
    >
      <Container>
        <Image src={image} style={{ height: 40, width: 40 }}></Image>
        &nbsp;&nbsp;
        <Link to="/">Coding Shikhi</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FaBars></FaBars>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="courses">Courses</Link>
            <Link href="#blog">Blog</Link>
            <Link href="#faq">FAQ</Link>
          </Nav>
          <DarkModeToggle
            onChange={setIsDarkMode}
            checked={isDarkMode}
            size={40}
          />

          <Nav>
            <Nav.Link href="#deets">
              {user?.uid ? (
                <>
                  {/* <span>{user?.displayName}</span> */}
                  {isHovering && <span>{user?.displayName}</span>}
                  &nbsp;
                  <>
                    <Button variant="light" onClick={handleLogOut}>
                      Logout
                    </Button>
                  </>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  {/* <Link to="/signup">Signup</Link> */}
                </>
              )}
            </Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              {user?.photoURL ? (
                <div>
                  <Image
                    style={{ height: "30px" }}
                    roundedCircle
                    src={user?.photoURL}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  ></Image>
                </div>
              ) : (
                <FaUser></FaUser>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
