import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button, Dropdown, DropdownItem} from 'reactstrap';
import axios from 'axios';

function AddExperimentForm(props) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [start, setStart] = useState()
    const [target, setTarget] = useState()

    const changeNameHandler = e => {
        setName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
    }
    const changeStartHandler = e => {
        setStart(e.target.value)
    }
    const changeTargetHandler = e => {
        setTarget(e.target.value)
    }

    const addExperiment = e => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/experiments", {
            ...props.experiment,
            name: name,
            description: description,
            start_date: start,
            target_success_rate: target
        })
        .then(function(res) {
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={addExperiment}>
            <FormGroup>
                <Label for="experiment-name" className="form-label">Experiment Name</Label>
                <Input type="text" classname="form-input" id="experiment-name" onChange={changeNameHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="description" className="form-label">Description</Label>
                <Input type="text" classname="form-input" id="description" onChange={changeDescriptionHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="start-date" className="form-label">Start Date</Label>
                <Input type="text" classname="form-input" id="start-date" onChange={changeStartHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="target" className="form-label">Target Success Rate</Label>
                <Input type="text" classname="form-input" id="target" onChange={changeTargetHandler}/>
            </FormGroup>
            <Button>Add Experiment</Button>
        </Form>
    )
}

export default AddExperimentForm;