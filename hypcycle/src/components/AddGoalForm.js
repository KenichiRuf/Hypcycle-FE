import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Tag from './Tag';
import axios from 'axios';

function AddGoalForm(props) {

    const [goalName, setGoalName] = useState("")
    const [description, setDescription] = useState("")
    const [target, setTarget] = useState()
    const [current, setCurrent] = useState()
    const [deadline, setDeadline] = useState()
    const [metric, setMetric] = useState()
    const [start, setStart] = useState()
    const [tags, setTags] = useState([])
    const [goalTags, setGoalTags] = useState([])
    const [goals, setGoals] = useState([])
    const [filter, setFilter] = useState(new Set())
    const [allGoals, setAllGoals] = useState([])

    useEffect(() => {
        axios.get(`https://${process.env.REACT_APP_DOMAIN}/api/goals`)
            .then(res => {
                setGoals(res.data.goals)
                setTags(res.data.tags)
                setGoalTags(res.data.goalTags)
                setAllGoals(res.data.goals)
            })
            .catch(err => console.log(err))
    }, [])

    const changeGoalNameHandler = e => {
        setGoalName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
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
        axios.post(`https://${process.env.REACT_APP_DOMAIN}/api/goals`, {
            name: goalName,
            description: description,
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

    const intersection = (goal, filter) => {
        if(filter.size === 0) {
            return true
        } else {
            let goalTagSet = new Set()
            let tags = goalTags.filter(tag => tag.goal_id === goal.id)
            tags.forEach(tag => goalTagSet.add(tag.tag_name))
            let notEmpty = false
            for (let element of filter) {
                if (goalTagSet.has(element)) {
                    notEmpty = true
                }
            }
            return notEmpty
        }
    }

    function filterGoals(tag) {
        let filterSet = filter
        let hasTag = filterSet.delete(tag.name)
        hasTag ? setFilter(filterSet)
            : setFilter(filter.add(tag.name))
        let filteredList = allGoals.filter(goal => intersection(goal, filter))
        setGoals(filteredList)
    }

    return(
        <div className="addGoalForm">
            <div className="addGoalForm-fields">
                <Form onSubmit={addGoal}>
                    <FormGroup>
                        <Label for="goal-name" className="form-label">Goal Name</Label>
                        <Input value={goalName} type="text" className="form-input" id="goal-name" onChange={changeGoalNameHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description" className="form-label">Description</Label>
                        <Input value={description} type="text" className="form-input" id="description" onChange={changeDescriptionHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="target" className="form-label">Target</Label>
                        <Input type="number" className="form-input" id="target" onChange={changeTargetHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="current" className="form-label">Current</Label>
                        <Input type="number" className="form-input" id="current" onChange={changeCurrentHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="start" className="form-label">Start Date</Label>
                        <Input type="date" className="form-input" id="start" onChange={changeStartDateHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="deadline" className="form-label">Deadline</Label>
                        <Input type="date" className="form-input" id="deadline" onChange={changeDeadlineHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="metric" className="form-label">Metric</Label>
                        <Input type="text" className="form-input" id="metric" onChange={changeMetricHandler}/>
                    </FormGroup>
                    <Button>Add Goal</Button>
                </Form>
            </div>
            <div className="goal-picker">
                <h1>Goal Suggestions</h1>
                <div className="tag-filter">
                    <h4>Filters:</h4>
                    <div className="tag-buttons">
                        {tags.map(tag => <Tag tag={tag} filter={filterGoals}/>)}
                    </div>
                </div>
                <div className="goal-picker-list">
                    {goals.map(goal => <div className="suggested-goal" onClick={() => setGoalName(goal.name)}>
                        <p>{goal.name}</p>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default AddGoalForm;