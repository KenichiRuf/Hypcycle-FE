import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import {Redirect} from 'react-router';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function CreateNewOrg(props) {

    const [name, setName] = useState("")
    const [redirect, setRedirect] = useState(false)

    const addOrg = e => {
        e.preventDefault()
        axios.post(`/api/orgs/${localStorage.getItem("userId")}`, {
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
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
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
                </div>
            </div>
        </div>
    )
}

export default CreateNewOrg;