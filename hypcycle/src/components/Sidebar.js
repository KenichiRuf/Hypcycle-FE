import React, {useState} from 'react';
import {Nav, NavItem, Button} from "reactstrap";
import icon from "../assets/hypcycle-icon.png";
import {Link} from 'react-router-dom';

function Sidebar () {

    const [open, setOpen] = useState(false)

    return(
        <div className={open ? "open-sidebar" : "sidebar"} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <div className="sidebar-header">
                <svg width="30px" height="30px" viewBox="0 0 16 16" class="menu-icon bi bi-list" stroke="white" fill="%fff" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                <div className={open ? "sidebar-logo" : "hide"}>
                    <Link to="/" className="sidebar-logo"><img src={icon} className="logo-image" alt="hypcycle logo"/></Link>
                </div>
            </div>
            <Nav className="sidebar-items">
                <NavItem className="sidebar-item">
                    <Link to="/dashboard"><img alt="home" src="https://img.icons8.com/ios-filled/30/000000/home.png"/></Link>
                    <Link to="/dashboard" className={open ? "sidebar-link" : "hide"}>Dashboard</Link>
                </NavItem>
                <NavItem className="sidebar-item">
                    <Link to="/goals"><img alt="goals" src="https://img.icons8.com/ios-filled/30/000000/goal.png"/></Link>
                    <Link to="/goals" className={open ? "sidebar-link" : "hide"}>Goals</Link>
                </NavItem>
                <NavItem className="sidebar-item">
                    <Link to="/ideas"><img alt="ideas" src="https://img.icons8.com/android/30/000000/idea.png"/></Link>
                    <Link to="/ideas" className={open ? "sidebar-link" : "hide"}>Ideas</Link>
                </NavItem>
                <NavItem className="sidebar-item">
                    <Link to="/experiments"><img alt="experiments" src="https://img.icons8.com/ios-filled/30/000000/thin-test-tube.png"/></Link>
                    <Link to="/experiments" className={open ? "sidebar-link" : "hide"}>Experiments</Link>
                </NavItem>
                {/* <NavItem className="sidebar-item">
                    <Link to="/playbooks"><img alt="playbooks" src="https://img.icons8.com/ios-filled/30/000000/strategy-board.png"/></Link>
                    <Link to="/playbooks" className={open ? "sidebar-link" : "hide"}>Playbooks</Link>
                </NavItem> */}
                <NavItem className="sidebar-item">
                    <Link to="/users"><img alt="users" src="https://img.icons8.com/ios-filled/30/000000/user-group-man-man.png"/></Link>
                    <Link to="/users" className={open ? "sidebar-link sidebar-last" : "hide"}>Users</Link>
                </NavItem>
            </Nav>
        </div>
    )
}

export default Sidebar;
