import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Redirect} from 'react-router';
import axios from 'axios';

function AddOrgForm(props) {

    const [name, setName] = useState("")
    const [redirect, setRedirect] = useState(false)

    const addOrg = e => {
        e.preventDefault()
        axios.post(`https://${process.env.REACT_APP_DOMAIN}/api/orgs/${localStorage.getItem("userId")}`, {
            name: name
        })
        .then(res => {
            localStorage.setItem("orgId", res.data.org[0])
            setRedirect(true)
        })
        .catch(err => console.log(err))
    }

    const changeNameHandler = e => setName(e.target.value)

    return(
        <div className="addOrgForm">
            <Form onSubmit={addOrg}>
                <h3>Create New Org</h3>
                <FormGroup>
                    <Label for="name" className="form-label">Org Name</Label>
                    <Input type="name" classname="form-input" id="name" onChange={changeNameHandler}/>
                </FormGroup>
                <Button>Create Org</Button>
            </Form>
            {redirect ? <Redirect to="/dashboard" /> : null}
        </div>
    )
}

export default AddOrgForm;