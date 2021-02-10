import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import binomialCDF from '../functions/binomialCDF';
import axios from 'axios';

function UpdateExperimentForm(props) {

    const [trials, setTrials] = useState(props.experiment.trials)
    const [successes, setSuccesses] = useState(props.experiment.successes)

    const changeTrialsHandler = e => {
        setTrials(e.target.value)
    }
    const changeSuccessesHandler = e => {
        setSuccesses(e.target.value)
    }

    const updateExperiment = e => {
        e.preventDefault();
        axios.put(`/api/experiments/${props.experiment.id}`, {
            trials: trials,
            successes: successes
        })
        .then(function(res) {
            props.setExperiment({
                ...props.experiment,
                trials: trials,
                successes: successes
            })
            props.setConfidence(
                Math.round(100*binomialCDF(trials, successes, props.experiment.target_success_rate))/100
            )
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={updateExperiment}>
            <FormGroup>
                <Label for="trials" className="form-label">Trials</Label>
                <Input type="number" classname="form-input" id="trials" onChange={changeTrialsHandler} value={trials}/>
            </FormGroup>
            <FormGroup>
                <Label for="successes" className="form-label">Successes</Label>
                <Input type="number" classname="form-input" id="successes" onChange={changeSuccessesHandler} value={successes}/>
            </FormGroup>
            <Button>Update Progress</Button>
        </Form>
    )
}

export default UpdateExperimentForm;
