import React from 'react';
import logo from "../assets/logo.png";
import {Nav, NavItem} from "reactstrap";
import {NavLink} from "react-router-dom";

function Navigation () {
    return(
        <div className="navigation">
            <a href="https://www.hypcycle.com" className="navigation-logo"><img src={logo} className="logo-image" alt="hypcycle logo"/></a>
            <Nav className="navigation-items">
                <NavItem>
                    <NavLink href="https://www.hypcycle.com/about" className="navigation-link">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://www.hypcycle.com/blog" className="navigation-link">Blog</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/login" className="navigation-link">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/register" className="navigation-link navigation-last">Sign Up</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Navigation;