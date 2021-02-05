import React, {useState, useEffect} from 'react'
import {Form, FormGroup, Label, Input, Button, Spinner} from 'reactstrap';
import axios from 'axios';
import DoubleCheckMark from '../assets/icons/DoubleCheckMark';
import XCircle from '../assets/icons/XCircle';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [match, setMatch] = useState(true)
    const [error, setError] = useState("")
    const [spin, setSpin] = useState(false)
    const [success, setSuccess] = useState(false)

    const changeNewPasswordHandler = e => {
        setNewPassword(e.target.value)
    }
    const changeConfirmPasswordHandler = e => {
        setConfirmPassword(e.target.value)
    }

    const resetPassword = e => {
        e.preventDefault()
        setError("");
        if(newPassword === confirmPassword) {
            axios.put(`/api/users/password/${localStorage.getItem("userId")}`, {
                password: newPassword
            })
            .then(res => {
                setSpin(false);
                setSuccess(true);
            })
            .catch(err => setError(err.message))
        }
    }

    useEffect(() => {
        if(newPassword === confirmPassword) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    }, [confirmPassword, newPassword])

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                        <Form onSubmit={resetPassword}>
                        <FormGroup>
                            <Label for="new-password" className="registration-label">New Password</Label>
                            <Input type="password" className="registration-input" id="new-password" onChange={changeNewPasswordHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="confirm-password" className="registration-label">Confirm New Password {match ? DoubleCheckMark : XCircle}</Label>
                            <Input type="password" className="registration-input" id="confirm-password" onChange={changeConfirmPasswordHandler}/>
                        </FormGroup>
                        {spin ? <Spinner color="dark" /> : success ? <p>Password Updated</p> :<Button className="update-password-button">Update Password</Button>}
                        {error ? <p>{error}</p> : null}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword;