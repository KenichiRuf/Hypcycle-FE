import React, {useState, useEffect} from 'react';
import logo from "../assets/logo.png";
import Avatar from "../components/Avatar";
import axios from "axios";
import {Modal} from "reactstrap";
import AddOrgForm from "./AddOrgForm";
import {Redirect} from "react-router"

function Header () {

    const [user, setUser] = useState("")
    const [orgName, setOrg] = useState("")
    const [addOrgModal, setAddOrgModal] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:4000/api/users/${localStorage.getItem("userId")}`)
            .then(function(res) {
                setUser(res.data.user)
            })
            .catch(function(err) {
                console.log(err)
            })
        axios.get(`http://localhost:4000/api/orgs/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setOrg(res.data.org.name)
            })
            .catch(function(err) {
                console.log(err)
            })
    }, [orgName])

    const toggleAddOrg = () => setAddOrgModal(!addOrgModal)

    const toggleDropdown = () => setShowDropdown(!showDropdown)

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
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p>{orgName}</p>
                </div>
                <Avatar onClick={toggleDropdown}/>
            </div>
            <div className={showDropdown ? "profile-dropdown" : "hide"}>
                <p className="create-new-org" onClick={toggleAddOrg}>Create New Org</p>
                <p className="logout" onClick={logout}>Logout</p>
            </div>
            <Modal isOpen={addOrgModal} toggle={toggleAddOrg}>
                <AddOrgForm />
            </Modal>
            {redirect ? <Redirect to='/login'/> : null}
        </div>
    )
}

export default Header;