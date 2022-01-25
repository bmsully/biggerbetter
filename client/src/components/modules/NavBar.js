import React, { Component } from "react";
import { useNavigate } from "@reach/router";
import { GoogleLogout } from "react-google-login";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import redpaperclip from "../../public/redpaperclip.png";

import "../../utilities.css";
import "./NavBar.css";

// Identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID =
  "1047284490856-mrho1ed88dmqm4m50sgi7pmo2sttogsb.apps.googleusercontent.com";

/**
 * NavBar is a Navigation Bar Component that appears at the top of all pages
 *
 * @param {String} userId id of active user
 * @param {Function} handleLogout logs out the active user
 * @param {Component} children active web page
 */
const NavBar = ({ userId, handleLogout, children }) => {
  const navigate = useNavigate();

  const redirect = (res) => {
    handleLogout(res);
    navigate(`/`);
  };

  return (
    <>
      <Navbar bg="light" variant="light" expand="sm" sticky="top" className="NavBar-border">
        <Container>
          <Navbar.Brand href="/" className="u-headerFont">
            <img alt="" src={redpaperclip} width="60" height="24" className="u-inlineBlock" />{" "}
            BiggerBetter
          </Navbar.Brand>
          {userId && (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="/explore">Explore</Nav.Link>
                  <Nav.Link href="/trades">Trades</Nav.Link>
                  <Nav.Link href={`/profile/${userId}`}>Profile</Nav.Link>
                  {userId ? (
                    <GoogleLogout
                      clientId={GOOGLE_CLIENT_ID}
                      buttonText="Logout"
                      onLogoutSuccess={redirect}
                      onFailure={(err) => console.log(err)}
                    />
                  ) : (
                    <></>
                  )}
                </Nav>
              </Navbar.Collapse>
            </>
          )}
          {userId ? (
            <></>
          ) : (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav-2" className="mb-1" />
              <Navbar.Collapse id="basic-navbar-nav-2">
                <Nav className="me-auto">
                  <Button variant="primary" href="/login" className="mt-1">
                    Get Started
                  </Button>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Container>
      </Navbar>
      {/* <nav>
        <div>BiggerBetter</div>
        <div>
          <Link to="/">Home</Link>
          {userId && (
            <>
              <Link to="/explore">Explore</Link>
              <Link to="/trades">Trades</Link>
              <Link to={`/profile/${userId}`}>Profile</Link>
            </>
          )}
        </div>
        {userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={redirect}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <div>
            <Link to="/login" className="NavBar-linkAsButton">
              Get Started
            </Link>
          </div>
        )}
      </nav> */}
      {children}
    </>
  );
};

export default NavBar;
