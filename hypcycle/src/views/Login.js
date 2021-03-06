import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button, Spinner, Modal} from 'reactstrap';
import {Redirect} from 'react-router';
import axios from 'axios';
import Navigation from '../components/Navigation';
import Org from "../components/Org";
import {Link} from 'react-router-dom';
import Mixpanel from '../functions/Mixpanel';

function Login () {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [loggedIn, setLoggedIn] = useState(false)
    const [error, setError] = useState(false)
    const [spin, setSpin] = useState(false)
    const [success, setSuccess] = useState(false)
    const [orgUsers, setOrgUsers] = useState([])
    const [modal, setModal] = useState(false)

    const changeEmailHandler = e => {
        setEmail(e.target.value)
    }

    const changePasswordHandler = e => {
        setPassword(e.target.value)
    }

    const toggle = () => setModal(!modal)


    const chooseOrg = (orgId, orgUserId) => {
        localStorage.setItem("orgId", orgId)
        localStorage.setItem("orgUserId", orgUserId)
        setLoggedIn(true)
    }

    const getOrgs = userId => {
        axios.get(`/api/users/orgUser/${userId}`)
            .then(function(res) {
                setOrgUsers(res.data.orgUsers);
            })
            .catch(function(err) {setError(err)});
        setModal(true);
    }

    const login = event => {
        event.preventDefault()
        setSpin(true)
        setError(false)
        axios.post( `/api/auth/login`, {
                email: email,
                password: password
            })
            .then(res => {
                Mixpanel.identify(email)
                localStorage.setItem("userId", res.data.userId)
                getOrgs(res.data.userId)
                setSpin(false);
                setSuccess(true);
                localStorage.setItem("token", res.data.token);
                Mixpanel.track("Login")
                Mixpanel.people.set({"$email": email})
            })
            .catch(err => {
                setSpin(false);
                setError("Login Failed");
            })
    }

    return(
        <div className="login-container">
            <Navigation />
            <Form className="login-form" id="login-form" onSubmit={login}>
                <h1 className="form-title">Login</h1>
                <hr className="form-divider"/>
                <div className="form-inputs">
                    <FormGroup>
                        <Label for="email" className="login-label">Email</Label>
                        <Input type="email" className="login-input" id="email" onChange={changeEmailHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="login-label">Password</Label>
                        <Input type="password" className="login-input" id="password" onChange={changePasswordHandler}/>
                    </FormGroup>
                </div>
                {spin ? <Spinner color="dark" /> : success ? <p>Login Successful!</p> :<Button className="login-button">Login</Button>}
                <p className="forgot-password"><Link to="/forgot-password">Forgot Password?</Link></p>
                {error ? <p className="error-message">{error}</p> : null}
            </Form>
            <Modal isOpen={modal} toggle={toggle} onClosed={() => {
                setSpin(false)
                setSuccess(false)
                }}>
                <h3>Choose An Org:</h3>
                <div className="org-list">
                    {orgUsers.map(orgUser => <Org name={orgUser.name} orgUserId={orgUser.id} orgId={orgUser.org_id} chooseOrg={chooseOrg}/>)}
                </div>
            </Modal>
            {loggedIn ? <Redirect to="/dashboard" /> : null}
        </div>
    )
}

export default Login;