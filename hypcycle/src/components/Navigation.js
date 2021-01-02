import React from 'react';
import logo from "../assets/logo.png";
import {Nav, NavItem, NavLink} from "reactstrap";

function Navigation () {
    return(
        <div className="navigation">
            <a href="/" className="navigation-logo"><img src={logo} className="logo-image" alt="hypcycle logo"/></a>
            <Nav className="navigation-items">
                <NavItem>
                    <NavLink href="" className="navigation-link">Features</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="" className="navigation-link">About</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="" className="navigation-link">Contact</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login" className="navigation-link">Login</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/register" className="navigation-link navigation-last">Sign Up</NavLink>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Navigation;