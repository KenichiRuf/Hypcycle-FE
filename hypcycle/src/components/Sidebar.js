import React, {useState} from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";
import icon from "../assets/hypcycle-icon.png";
import {Link} from 'react-router-dom';

function Sidebar () {

    const [open, setOpen] = useState(false)

    return(
        <div className="sidebar">
            <div className="sidebar-icons">
                <div className="sidebar-header">
                    <svg width="30px" height="30px" viewBox="0 0 16 16" class="menu-icon bi bi-list" stroke="white" fill="%fff" xmlns="http://www.w3.org/2000/svg" onClick={() => setOpen(!open)}>
                        <path fill-rule="evenodd" d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </div>
                <Nav className="sidebar-items">
                    <NavItem className="sidebar-item">
                        <Link to="/dashboard"><img alt="home" src="https://img.icons8.com/ios-filled/30/000000/home.png"/></Link>
                    </NavItem>
                    <NavItem className="sidebar-item">
                    <Link to="/goals"><img alt="goals" src="https://img.icons8.com/ios-filled/30/000000/goal.png"/></Link>
                    </NavItem>
                    <NavItem className="sidebar-item">
                        <Link to="/ideas"><img alt="ideas" src="https://img.icons8.com/android/30/000000/idea.png"/></Link>
                    </NavItem>
                    <NavItem className="sidebar-item">
                        <Link to="/experiments"><img alt="experiments" src="https://img.icons8.com/ios-filled/30/000000/thin-test-tube.png"/></Link>
                    </NavItem>
                    {/* <NavItem className="sidebar-item">
                        <Link to="/playbooks"><img alt="playbooks" src="https://img.icons8.com/ios-filled/30/000000/strategy-board.png"/></Link>
                    </NavItem> */}
                    <NavItem className="sidebar-item">
                        <Link to="/users"><img alt="users" src="https://img.icons8.com/ios-filled/30/000000/user-group-man-man.png"/></Link>
                    </NavItem>
                </Nav>
            </div>
            <div className={open ? "sidebar-labels" : "hide"}>
                <div className="sidebar-labels-header">
                    <Link to="/" className={open ? "sidebar-logo" : "hide"}><img src={icon} className="logo-image" alt="hypcycle logo"/></Link>
                </div>
                <Nav className="sidebar-labels-items">
                    <NavItem className="sidebar-item">
                        <NavLink href="/dashboard" className={open ? "sidebar-link" : "hide"}>Dashboard</NavLink>
                    </NavItem>
                    <NavItem className="sidebar-item">
                        <NavLink href="/goals" className={open ? "sidebar-link" : "hide"}>Goals</NavLink>
                    </NavItem>
                    <NavItem className="sidebar-item">
                        <NavLink href="/ideas" className={open ? "sidebar-link" : "hide"}>Ideas</NavLink>
                    </NavItem>
                    <NavItem className="sidebar-item">
                        <NavLink href="/experiments" className={open ? "sidebar-link" : "hide"}>Experiments</NavLink>
                    </NavItem>
                    {/* <NavItem className="sidebar-item">
                        <NavLink href="/playbooks" className={open ? "sidebar-link" : "hide"}>Playbooks</NavLink>
                    </NavItem> */}
                    <NavItem className="sidebar-item">
                        <NavLink href="/users" className={open ? "sidebar-link sidebar-last" : "hide"}>Users</NavLink>
                    </NavItem>
                </Nav>
            </div>
        </div>
    )
}

export default Sidebar;