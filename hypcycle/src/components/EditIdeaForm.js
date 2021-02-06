import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';


function EditIdeaForm(props) {

    const [ideaName, setIdeaName] = useState(props.idea.name)
    const [description, setDescription] = useState(props.idea.description)

    const changeIdeaNameHandler = e => {
        setIdeaName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
    }

    const editIdea = e => {
        e.preventDefault();
        axios.put(`/api/ideas/${props.idea.id}`, {
            name: ideaName,
            description: description
        })
        .then(function(res) {
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    return(
        <Form onSubmit={editIdea}>
            <FormGroup>
                <Label for="idea-name" className="form-label">Idea Name</Label>
                <Input type="text" classname="form-input" id="idea-name" onChange={changeIdeaNameHandler} value={ideaName}/>
            </FormGroup>
            <FormGroup>
                <Label for="description" className="form-label">Description</Label>
                <Input type="text" classname="form-input" id="description" onChange={changeDescriptionHandler} value={description}/>
            </FormGroup>
            <Button>Update Idea</Button>
        </Form>
    )
}

export default EditIdeaForm;