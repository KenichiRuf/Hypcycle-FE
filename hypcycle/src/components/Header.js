import React, {useState, useEffect} from 'react';
import logo from "../assets/logo.png";
import Avatar from "../components/Avatar";
import axios from "axios";
import {Modal} from "reactstrap";
import AddOrgForm from "./AddOrgForm";
import {Redirect} from "react-router";
import Org from "./Org";

function Header () {

    const [user, setUser] = useState("")
    const [orgName, setOrg] = useState("")
    const [addOrgModal, setAddOrgModal] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [orgUsers, setOrgUsers] = useState([])
    const [switchOrgModal, setSwitchOrgModal] = useState(false)
    const [redirectDashboard, setRedirectDashboard] = useState(false)

    useEffect(() => {
        axios.get(`${process.env.DOMAIN}/api/users/${localStorage.getItem("userId")}`)
            .then(res => setUser(res.data.user))
            .catch(err => console.log(err))
        axios.get(`${process.env.DOMAIN}/api/orgs/${localStorage.getItem("orgId")}`)
            .then(res => setOrg(res.data.org.name))
            .catch(err => console.log(err))
        axios.get(`${process.env.DOMAIN}/api/users/orgUser/${localStorage.getItem("userId")}`)
            .then(res => setOrgUsers(res.data.orgUsers))
            .catch(err => console.log(err))
    }, [orgName])

    const toggleAddOrg = () => setAddOrgModal(!addOrgModal)

    const toggleSwitchOrg = () => setSwitchOrgModal(!switchOrgModal)

    const toggleDropdown = () => setShowDropdown(!showDropdown)

    const onAddOrgClosed = () => setShowDropdown(false)

    const onSwitchOrgClosed = () => setShowDropdown(false)

    const chooseOrg = orgId => {
        localStorage.setItem("orgId", orgId)
        setSwitchOrgModal(false)
        setShowDropdown(false)
        setRedirectDashboard(true)
    }

    const logout = () => {
        localStorage.removeItem("userId")
        localStorage.removeItem("token")
        localStorage.removeItem("orgId")
        setRedirect(true)
    }
    
    return(
        <div className="app-header">
            <a href="/dashboard" className="header-logo"><img src={logo} className="header-logo-image" alt="hypcycle logo"/></a>
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
                <p className="create-new-org" onClick={toggleAddOrg}>Create New Org</p>
                <p className="logout" onClick={logout}>Logout</p>
            </div>
            <Modal isOpen={addOrgModal} toggle={toggleAddOrg} onClosed={onAddOrgClosed}>
                <AddOrgForm />
            </Modal>
            <Modal isOpen={switchOrgModal} toggle={toggleSwitchOrg} onClosed={onSwitchOrgClosed}>
                <h2>Choose Org:</h2>
                <div className="org-list">
                    {orgUsers.map(orgUser => <Org name={orgUser.name} id={orgUser.org_id} chooseOrg={chooseOrg}/>)}
                </div>
            </Modal>
            {redirect ? <Redirect to='/login'/> : null}
            {redirectDashboard ? <Redirect to='/dashboard'/> : null}
        </div>
    )
}

export default Header;