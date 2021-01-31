import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

function AddIdeaFromGoal(props) {

    const [ideaName, setIdeaName] = useState("")
    const [description, setDescription] = useState("")
    const [goal, setGoal] = useState(props.goals[0])
    const [ideas, setIdeas] = useState([])

    const changeIdeaNameHandler = e => {
        setIdeaName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        axios.get(`${process.env.DOMAIN}/api/ideas/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setIdeas(res.data.ideas)
            })
            .catch(function(err){console.log(err)})
    }, [ideas])

    const addIdea = e => {
        e.preventDefault();
        axios.post(`${process.env.DOMAIN}/api/ideas`, {
            name: ideaName,
            goal_id: goal.id,
            org_id: localStorage.getItem("orgId"),
            created_by: localStorage.getItem("userId"),
            description: description,
            next: null,
            previous: null
        })
        .then(function(res) {
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={addIdea}>
            <FormGroup>
                <Label for="idea-name" className="form-label">Idea Name</Label>
                <Input type="text" classname="form-input" id="idea-name" onChange={changeIdeaNameHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="description" className="form-label">Description</Label>
                <Input type="text" classname="form-input" id="description" onChange={changeDescriptionHandler}/>
            </FormGroup>
            <FormGroup>
                <select>
                    {props.goals.map(goal => <option onClick={() => setGoal(goal)}>{goal.name}</option>)}
                </select>
            </FormGroup>
            <Button>Add Idea</Button>
        </Form>
    )
}

export default AddIdeaFromGoal;