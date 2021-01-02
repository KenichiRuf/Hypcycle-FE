import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

function AddGoalForm(props) {

    const [goalName, setGoalName] = useState("")
    const [target, setTarget] = useState()
    const [current, setCurrent] = useState()
    const [deadline, setDeadline] = useState()
    const [metric, setMetric] = useState()
    const [start, setStart] = useState()

    const changeGoalNameHandler = e => {
        setGoalName(e.target.value)
    }
    const changeTargetHandler = e => {
        setTarget(e.target.value)
    }
    const changeCurrentHandler = e => {
        setCurrent(e.target.value)
    }
    const changeDeadlineHandler = e => {
        setDeadline(e.target.value)
    }
    const changeStartDateHandler = e => {
        setStart(e.target.value)
    }
    const changeMetricHandler = e => {
        setMetric(e.target.value)
    }

    const addGoal = e => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/goals", {
            name: goalName,
            org_id: localStorage.getItem("orgId"),
            owner_id: localStorage.getItem("userId"),
            start_value: current,
            current_value: current,
            goal_value: target,
            start_date: start,
            deadline: deadline,
            metric: metric
        })
        .then(function(res) {
            props.setGoalList([...props.goals, res.data.goal])
            props.toggle()
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={addGoal}>
            <FormGroup>
                <Label for="goal-name" className="form-label">Goal Name</Label>
                <Input type="text" classname="form-input" id="goal-name" onChange={changeGoalNameHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="target" className="form-label">Target</Label>
                <Input type="number" classname="form-input" id="target" onChange={changeTargetHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="current" className="form-label">Current</Label>
                <Input type="number" classname="form-input" id="current" onChange={changeCurrentHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="start" className="form-label">Start Date</Label>
                <Input type="date" classname="form-input" id="start" onChange={changeStartDateHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="deadline" className="form-label">Deadline</Label>
                <Input type="date" classname="form-input" id="deadline" onChange={changeDeadlineHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="metric" className="form-label">Metric</Label>
                <Input type="text" classname="form-input" id="metric" onChange={changeMetricHandler}/>
            </FormGroup>
            <Button>Add Goal</Button>
        </Form>
    )
}

export default AddGoalForm;