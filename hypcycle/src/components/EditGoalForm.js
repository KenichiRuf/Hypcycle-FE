import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';


function EditGoalForm(props) {

    const [goalName, setGoalName] = useState(props.goal.name)
    const [description, setDescription] = useState(props.goal.description)

    const changeGoalNameHandler = e => {
        setGoalName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
    }

    const editGoal = e => {
        e.preventDefault();
        axios.put(`/api/goals/${props.goal.id}`, {
            name: goalName,
            description: description
        })
        .then(function(res) {
            props.setGoal({...props.Goal, name: goalName, description: description})
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={editGoal}>
            <FormGroup>
                <Label for="goal-name" className="form-label">Goal Name</Label>
                <Input type="text" classname="form-input" id="goal-name" onChange={changeGoalNameHandler} value={goalName}/>
            </FormGroup>
            <FormGroup>
                <Label for="description" className="form-label">Description</Label>
                <Input type="text" classname="form-input" id="description" onChange={changeDescriptionHandler} value={description}/>
            </FormGroup>
            <Button>Update Goal</Button>
        </Form>
    )
}

export default EditGoalForm;