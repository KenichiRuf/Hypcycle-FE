import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import Mixpanel from '../functions/Mixpanel';

function UpdateGoalForm(props) {

    const [current, setCurrent] = useState(props.goal['current_value'])

    const changeCurrentHandler = e => {
        setCurrent(e.target.value)
    }

    const updateGoal = e => {
        e.preventDefault();
        axios.put(`/api/goals/${props.goal.id}`, {
            current_value: current,
        })
        .then(function(res) {
            Mixpanel.track("Goal Update")
            props.toggle();
            props.update(current);
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={updateGoal}>
            <FormGroup>
                <Label for="current" className="form-label">Current</Label>
                <Input type="number" classname="form-input" id="current" onChange={changeCurrentHandler} value={current}/>
            </FormGroup>
            <Button>Update Goal</Button>
        </Form>
    )
}

export default UpdateGoalForm;