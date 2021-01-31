import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import {Redirect} from "react-router";

function AddExperimentForm(props) {

    const [name, setName] = useState(props.experiment.name)
    const [description, setDescription] = useState(props.experiment.description)
    const [start, setStart] = useState()
    const [target, setTarget] = useState()
    const [redirect, setRedirect] = useState(false)

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
        axios.post(`${process.env.DOMAIN}/api/experiments`, {
            ...props.experiment,
            name: name,
            description: description,
            start_date: start,
            target_success_rate: target
        })
        .then(function(res) {
            props.toggle();
            setRedirect(true)
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={addExperiment}>
            <FormGroup>
                <Label for="experiment-name" className="form-label">Experiment Name</Label>
                <Input value={name} type="text" className="form-input" id="experiment-name" onChange={changeNameHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="description" className="form-label">Description</Label>
                <Input value={description} type="text" className="form-input" id="description" onChange={changeDescriptionHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="start-date" className="form-label">Start Date</Label>
                <Input type="date" className="form-input" id="start-date" onChange={changeStartHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="target" className="form-label">Target Success Rate</Label>
                <Input type="number" step="any" className="form-input" id="target" onChange={changeTargetHandler}/>
            </FormGroup>
            <Button>Add Experiment</Button>
            {redirect ? <Redirect to="/experiments"/> : null}
        </Form>
    )
}

export default AddExperimentForm;