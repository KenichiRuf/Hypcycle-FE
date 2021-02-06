import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UpdateProfile = () => {

    const [message, setMessage] = useState()
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        Axios.get(`/api/users/${localStorage.getItem("userId")}`)
            .then(res => {
                setFirstName(res.data.user.first_name)
                setLastName(res.data.user.last_name)
                setEmail(res.data.user.email)
            })
            .catch(err => setMessage(err))
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

    const update = () => {
        Axios.put(`/api/users/${localStorage.getItem("userId")}`, {
            first_name: firstName,
            last_name: lastName,
            email: email
        })
        .then(res => setMessage("Profile Updated"))
        .catch(err => setMessage("Update Error"))
    }

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <h1>User Profile</h1>
                    <Form onSubmit={update}>
                        <FormGroup>
                            <Label for="first-name" className="form-label">First Name</Label>
                            <Input type="text" className="input-label" id="first-name" value={firstName} onChange={changeFirstNameHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="last-name" className="form-label">Last Name</Label>
                            <Input type="text" className="input-label" id="last-name" value={lastName} onChange={changeLastNameHandler}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email" className="form-label">Email</Label>
                            <Input type="email" className="input-label" id="email" value={email} onChange={changeEmailHandler}/>
                        </FormGroup>
                        <Button>Update Profile</Button>
                        {message ? <p>{message}</p> : null}
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfile