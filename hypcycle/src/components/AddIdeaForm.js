import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button, Dropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import axios from 'axios';

function AddIdeaForm(props) {

    const [ideaName, setIdeaName] = useState("")
    const [description, setDescription] = useState("")
    const [goal, setGoal] = useState()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const changeIdeaNameHandler = e => {
        setIdeaName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
    }

    const addIdea = e => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/ideas", {
            name: ideaName,
            goal_id: goal.id,
            org_id: localStorage.getItem("orgId"),
            created_by: localStorage.getItem("userId"),
            description: description,
            next: null,
            previous: props.ideas.length === 0 ? null : props.ideas[props.ideas.length-1].id
        })
        .then(function(res) {
            props.setIdeas([...props.ideas, res.data.idea])
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    const toggle = () => setDropdownOpen(!dropdownOpen)

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
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>Choose Goal</DropdownToggle>
                    <DropdownMenu>
                        {props.goals.map(goal => <DropdownItem onClick={() => setGoal(goal)}>{goal.name}</DropdownItem>)}
                    </DropdownMenu>
                </Dropdown>
            </FormGroup>
            <Button>Add Idea</Button>
        </Form>
    )
}

export default AddIdeaForm;