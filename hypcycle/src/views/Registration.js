import React, {useState, useEffect} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Redirect} from 'react-router';
import axios from 'axios';
import DoubleCheckMark from '../assets/icons/DoubleCheckMark';
import XCircle from '../assets/icons/XCircle';
import Navigation from '../components/Navigation';

function Registration () {
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [companyName,setCompanyName] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [error, setError] = useState("")
    const [registered, setRegistered] = useState(false)
    const [match, setMatch] = useState(true)

    useEffect(() => {
        if(password === confirmPassword) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    })

    const changeFirstNameHandler = e => {
        setFirstName(e.target.value)
    }
    const changeLastNameHandler = e => {
        setLastName(e.target.value)
    }
    const changeEmailHandler = e => {
        setEmail(e.target.value)
    }
    const changeCompanyNameHandler = e => {
        setCompanyName(e.target.value)
    }
    const changePasswordHandler = e => {
        setPassword(e.target.value)
    }
    const changeConfirmPasswordHandler = e => {
        setConfirmPassword(e.target.value)
    }

    const register = event => {
        event.preventDefault()
        setError("")
        if(password === confirmPassword) {
            axios.post( "http://localhost:4000/api/auth/register", {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                companyName: companyName
            })
            .then(res => setRegistered(true))
            .catch(err => setError(err.message))
        } else {
            setError("Passwords must match")
        }
    }

    return(
        <div className="registration-container">
            <Navigation />
            <Form className="registration-form" onSubmit={register}>
                <h1 className="form-title">Create Account</h1>
                <hr className="form-divider"/>
                <div className="form-inputs">
                    <FormGroup>
                        <Label for="first-name" className="registration-label">First Name</Label>
                        <Input type="text" className="registration-input" id="first-name" onChange={changeFirstNameHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="last-name" className="registration-label">Last Name</Label>
                        <Input type="text" className="registration-input" id="last-name" onChange={changeLastNameHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email" className="registration-label">Email</Label>
                        <Input type="email" className="registration-input" id="email" onChange={changeEmailHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company-name" className="registration-label">Company Name</Label>
                        <Input type="text" className="registration-input" id="company-name" onChange={changeCompanyNameHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="registration-label">Password</Label>
                        <Input type="password" className="registration-input" id="password" onChange={changePasswordHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirm-password" className="registration-label">Confirm Password {match ? DoubleCheckMark : XCircle}</Label>
                        <Input type="password" className="registration-input" id="confirm-password" onChange={changeConfirmPasswordHandler}/>
                    </FormGroup>
                </div>
                <Button className="registration-button">Create Account</Button>
                {error ? <p>{error}</p> : null}
                <p className="login-here">Already have an account? <a href="/login">Login here.</a></p>
            </Form>
            {registered ? <Redirect to="/login" /> : null}
        </div>
    )
}

export default Registration;