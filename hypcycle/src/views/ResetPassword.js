import React, {useState, useEffect} from 'react'
import {Form, FormGroup, Label, Input, Button, Modal, Spinner} from 'reactstrap';
import axios from 'axios';
import DoubleCheckMark from '../assets/icons/DoubleCheckMark';
import XCircle from '../assets/icons/XCircle';
import {Redirect} from 'react-router';
import Org from "../components/Org";
import Navigation from "../components/Navigation";

const ResetPassword = props => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [match, setMatch] = useState(true)
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState("")
    const [modal, setModal] = useState(false)
    const [orgs, setOrgs] = useState([])
    const [spin, setSpin] = useState(false)
    const [success, setSuccess] = useState(false)
    const [password, setPassword] = useState(props.match.params.password)

    const changeNewPasswordHandler = e => {
        setNewPassword(e.target.value)
    }
    const changeConfirmPasswordHandler = e => {
        setConfirmPassword(e.target.value)
    }

    const toggle = () => setModal(!modal)

    const chooseOrg = orgId => {
        localStorage.setItem("orgId", orgId)
        setRedirect(true)
    }

    const getOrgs = userId => {
        axios.get(`/api/users/orgUser/${userId}`)
            .then(function(res) {
                console.log(res.data.orgUsers)
                setOrgs(res.data.orgUsers);
            })
            .catch(function(err) {setError(err)});
    }

    const resetPassword = () => {
        setError("");
        if(newPassword === confirmPassword) {
            axios.put(`/api/users/password/${props.match.params.userId}`, {
                password: newPassword
            })
            .then(res => {
                setSpin(false);
                setSuccess(true);
                setModal(true);
            })
            .catch(err => setError(err.message))
        }
    }

    const login = pw => {
        axios.post(`/api/auth/login`, {
            email: props.match.params.email,
            password: pw
        })
        .then(res => {
            localStorage.setItem("userId", res.data.userId)
            localStorage.setItem("token", res.data.token)
            getOrgs(res.data.userId)
        })
        .catch(err => {
            setSpin(false);
            setError("Login Failed");
        })
    }

    useEffect(() => {
        if(newPassword === confirmPassword) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    }, [confirmPassword, newPassword])

    useEffect(() => {
        login(password)
    }, [orgs])

    return(
        <div className="app-container">
            <div className="app-content">
                <Navigation />
                <div className="view-container">
                    <div>
                        <Form onSubmit={resetPassword}>
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
                        {redirect ? <Redirect to="/dashboard" /> : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;