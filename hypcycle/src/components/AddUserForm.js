import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import domain from '../globalVariables/domain';

function AddUserForm(props) {

    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const addUser = e => {
        e.preventDefault()
        axios.post(`${domain}/api/users/${localStorage.getItem("orgId")}`, {
            email: email
        })
        .then(res => {
            props.setUsers([...props.users, res.data.orgUser])
            setMessage("Invite Successful!")
        })
        .catch(err => setMessage("Invite Failed"))
    }

    const changeEmailHandler = e => setEmail(e.target.value)

    return(
        <div className="addUserForm">
            <Form onSubmit={addUser}>
                <h3>Invite a New User</h3>
                <FormGroup>
                    <Label for="email" className="form-label">Email</Label>
                    <Input type="email" classname="form-input" id="email" onChange={changeEmailHandler}/>
                </FormGroup>
                <Button>Invite User</Button>
                <p>{message}</p>
            </Form>
        </div>
    )
}

export default AddUserForm;