import React, {  useContext, useEffect, useState } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, NavbarToggler, Collapse } from 'reactstrap';
import { NavLink as ReactLink, useNavigate } from 'react-router-dom';
import { doLogout, getCurrUser, isLoggedIn } from '../Auth/Auth';
 import userContext from '../context/userContext';
 import "./CustomNavbar.css";


 
 const CustomNavbar = () => {
  const userContextData = useContext(userContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    setLogin(isLoggedIn());
    setUser(getCurrUser());
  }, [login]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    doLogout(() => {
      setLogin(false);
      userContextData.setUser({
        data: null,
        login: false
      });
      navigate('/');
    });
  };

  return (
    <Navbar  dark expand="md" className=" nav-div px-3 py-3">
      <NavbarBrand tag={ReactLink} to="/" className="text-warning">
        StudentBridge
      </NavbarBrand>
      <NavbarToggler onClick={toggleNavbar} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink tag={ReactLink} to="/home" className="text1 ">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={ReactLink} to="/about" className="text1 ">
              About
            </NavLink>
          </NavItem>
        </Nav>

        <Nav className="ml-auto" navbar>
          {(!login || !user) && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to="/login" className="text1">
                  Login
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/signup" className="text1">
                  Signup
                </NavLink>
              </NavItem>
            </>
          )}

          {login && user && (
            <>
              <NavItem>
                <NavLink tag={ReactLink} to={`/user/profile/${user.id}`} className="text1">
                  Profile
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} to="/user/dashboard" className="text1">
                  Post
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={ReactLink} onClick={logout} className="text1">
                  <span className="text-warning">Logout</span>
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default CustomNavbar;