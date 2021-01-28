import React, {useState, useEffect} from 'react'
import {Form, FormGroup, Label, Input, Button, Modal, Spinner} from 'reactstrap';
import axios from 'axios';
import DoubleCheckMark from '../assets/icons/DoubleCheckMark';
import XCircle from '../assets/icons/XCircle';
import {Redirect} from 'react-router';
import Org from "../components/Org";

const ResetPassword = props => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [match, setMatch] = useState(true)
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState("")
    const [modal, setModal] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [spin, setSpin] = useState(false)
    const [success, setSuccess] = useState(false)

    const changeNewPasswordHandler = e => {
        setNewPassword(e.target.value)
    }
    const changeConfirmPasswordHandler = e => {
        setConfirmPassword(e.target.value)
    }

    const toggle = () => setModal(!modal)

    const chooseOrg = orgId => {
        localStorage.setItem("orgId", orgId)
        setLoggedIn(true)
    }

    const getOrgs = userId => {
        axios.get(`http://localhost:4000/api/users/orgUser/${userId}`)
            .then(function(res) {
                setOrgs(res.data.orgUsers);
            })
            .catch(function(err) {setError(err)});
        setModal(true);
    }

    const resetPassword = event => {
        console.log("reset")
        event.preventDefault();
        setError("");
        if(newPassword === confirmPassword) {
            axios.put(`http://localhost:4000/api/users/password/${props.match.params.userId}`, {
                password: newPassword
            })
            .then(res => {
                setLoggedIn(true);
                setSpin(false);
                setSuccess(true);
            })
            .catch(err => setError(err.message))
        }
    }

    const login = event => {
        event.preventDefault()
        if(match) {
            axios.post( "http://localhost:4000/api/auth/login", {
                email: props.match.params.email,
                password: props.match.params.password
            })
            .then(res => {
                localStorage.setItem("userId", res.data.userId)
                getOrgs(res.data.userId)
                localStorage.setItem("token", res.data.token);
                resetPassword()
            })
            .catch(err => {
                setSpin(false);
                setError("Login Failed");
            })
        } else {
            setError("Passwords Do Not Match")
        }
    }

    useEffect(() => {
        if(newPassword === confirmPassword) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    })

    return(
        <div>
            <Form onSubmit={login}>
                <FormGroup>
                    <Label for="new-password" className="registration-label">New Password</Label>
                    <Input type="password" className="registration-input" id="new-password" onChange={changeNewPasswordHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="confirm-password" className="registration-label">Confirm New Password {match ? DoubleCheckMark : XCircle}</Label>
                    <Input type="password" className="registration-input" id="confirm-password" onChange={changeConfirmPasswordHandler}/>
                </FormGroup>
                {spin ? <Spinner color="dark" /> : success ? <p>Login Successful!</p> :<Button className="update-password-button">Update Password</Button>}
                {error ? <p>{error}</p> : null}
            </Form>
            <Modal isOpen={modal} toggle={toggle}>
                <div className="org-list">
                    {orgs.map(org => <Org org={org} chooseOrg={chooseOrg}/>)}
                </div>
            </Modal>
            {loggedIn ? <Redirect to="/dashboard" /> : null}
        </div>
    )
}

export default ResetPassword;