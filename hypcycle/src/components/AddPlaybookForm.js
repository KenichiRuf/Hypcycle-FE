import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

function AddPlaybookForm(props) {

    const [name, setName] = useState("")

    const addPlaybook = () => {
        axios.post(`/api/playbooks`, {
            name: name,
            org_id: localStorage.getItem("orgId"),
            owner_id: localStorage.getItem("userId")
        })
        .then(res => props.setPlaybooks(res.data.playbooks))
        .catch(err => console.log(err))
    }

    const changeNameHandler = e => setName(e.target.value)

    return(
        <Form onSubmit={addPlaybook}>
            <FormGroup>
                <Label for="playbook-name" className="form-label">Playbook Name</Label>
                <Input type="text" classname="form-input" id="playbook-name" onChange={changeNameHandler}/>
            </FormGroup>
            <Button>Add Playbook</Button>
        </Form>
    )
}

export default AddPlaybookForm;