import React, {useState, useEffect} from 'react';
import logo from "../assets/logo.png";
import Avatar from "../components/Avatar";
import axios from "axios";
import {Modal} from "reactstrap";
import {Redirect} from "react-router";
import Org from "./Org";
import {Link} from 'react-router-dom';

function Header () {

    const [user, setUser] = useState("")
    const [orgName, setOrg] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [orgUsers, setOrgUsers] = useState([])
    const [switchOrgModal, setSwitchOrgModal] = useState(false)

    useEffect(() => {
        axios.get(`/api/users/${localStorage.getItem("userId")}`)
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err))
        axios.get(`/api/orgs/${localStorage.getItem("orgId")}`)
            .then(res => setOrg(res.data.org.name))
            .catch(err => console.log(err))
        axios.get(`/api/users/orgUser/${localStorage.getItem("userId")}`)
            .then(res => setOrgUsers(res.data.orgUsers))
            .catch(err => console.log(err))
    }, [orgName])

    const toggleSwitchOrg = () => setSwitchOrgModal(!switchOrgModal)

    const toggleDropdown = () => setShowDropdown(!showDropdown)

    const onSwitchOrgClosed = () => setShowDropdown(false)

    const chooseOrg = orgId => {
        localStorage.setItem("orgId", orgId)
        setSwitchOrgModal(false)
        setShowDropdown(false)
    }

    const logout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        localStorage.removeItem("orgId")
        setRedirect(true)
    }
    
    return(
        <div className="app-header">
            <Link to="/dashboard" className="header-logo"><img src={logo} className="header-logo-image" alt="hypcycle logo"/></Link>
            <div className="app-header-user-block">
                <div className="app-header-user-block-text">
                    {user.first_name ? <h2>{user.first_name} {user.last_name}</h2>
                        : <h2>{user.email}</h2>
                    }
                    <p>{orgName}</p>
                </div>
                <Avatar onClick={toggleDropdown}/>
            </div>
            <div className={showDropdown ? "profile-dropdown" : "hide"}>
                {orgUsers.length > 1 ? <p className="switch-org" onClick={toggleSwitchOrg}>Switch Org</p>
                : null}
                <Link to="/new-org"><p className="create-new-org">Create New Org</p></Link>
                <p className="logout" onClick={logout}>Logout</p>
            </div>
            <Modal isOpen={switchOrgModal} toggle={toggleSwitchOrg} onClosed={onSwitchOrgClosed}>
                <h2>Choose Org:</h2>
                <div className="org-list">
                    {orgUsers.map(orgUser => <Org name={orgUser.name} id={orgUser.org_id} chooseOrg={chooseOrg}/>)}
                </div>
            </Modal>
            {redirect ? <Redirect to='/login'/> : null}
        </div>
    )
}

export default Header;