import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';

function AddPlayForm(props) {

    const [name, setName] = useState(props.experiment.name)
    const [description, setDescription] = useState(props.experiment.description)
    const [playbooks, setPlaybooks] = useState([])
    const [playbook, setPlaybook] = useState()

    useEffect(() => {
        axios.get(`http://localhost:4000/api/playbooks/${localStorage.getItem("orgId")}`)
            .then(res => {
                setPlaybooks(res.data.playbooks)
                setPlaybook(res.data.playbooks[0])
            })
            .catch(err => console.log(err))
    }, [])

    const addPlay = () => {
        axios.post('http://localhost:4000/api/plays', {
            name: name,
            description: description,
            playbook_id: playbook.id,
            created_by: localStorage.getItem("userId")
        })
        .then(res => props.setPlays(res.data.plays))
        .catch(err => console.log(err))
    }

    const changeNameHandler = e => setName(e.target.value)
    const changeDescriptionHandler = e => setDescription(e.target.value)

    return(
        <Form onSubmit={addPlay}>
            <FormGroup>
                <Label for="play-name" className="form-label">Play Name</Label>
                <Input type="text" value={name} classname="form-input" id="play-name" onChange={changeNameHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="play-description" className="form-label">Description</Label>
                <Input type="text" value={description} classname="form-input" id="play-description" onChange={changeDescriptionHandler}/>
            </FormGroup>
            <FormGroup>
                <Label for="play-name" className="form-label">Playbook</Label>
                <select>
                    {playbooks.map(playbook => <option onClick={() => setPlaybook(playbook)}>{playbook.name}</option>)}
                </select>
            </FormGroup>
            <Button>Add Play</Button>
        </Form>
    )
}

export default AddPlayForm;