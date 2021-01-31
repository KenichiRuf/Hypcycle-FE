import React, {useEffect, useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import Tag from './Tag';
import axios from 'axios';

function AddIdeaForm(props) {

    const [ideaName, setIdeaName] = useState("")
    const [description, setDescription] = useState("")
    const [goal, setGoal] = useState(props.goals[0])
    const [ideas, setIdeas] = useState([])
    const [tags, setTags] = useState([])
    const [ideaTags, setIdeaTags] = useState([])
    const [allIdeas, setAllIdeas] = useState([])
    const [filter, setFilter] = useState(new Set())

    const changeIdeaNameHandler = e => {
        setIdeaName(e.target.value)
    }
    const changeDescriptionHandler = e => {
        setDescription(e.target.value)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/api/ideas')
        .then(res => {
            console.log(res)
            setIdeas(res.data.ideas)
            setTags(res.data.tags)
            setIdeaTags(res.data.ideaTags)
            setAllIdeas(res.data.ideas)
        })
        .catch(err => console.log(err))
    }, [])

    const addIdea = e => {
        e.preventDefault();
        axios.post("http://localhost:4000/api/ideas", {
            name: ideaName,
            goal_id: goal.id,
            org_id: localStorage.getItem("orgId"),
            created_by: localStorage.getItem("userId"),
            description: description,
            next: null,
            previous: null
        })
        .then(function(res) {
            props.setIdeas([...props.ideas, res.data.idea])
            props.toggle();
        })
        .catch(function(err) {console.log(err)})
    }

    const intersection = (idea, filter) => {
        if(filter.size === 0) {
            return true
        } else {
            let ideaTagSet = new Set()
            let tags = ideaTags.filter(tag => tag.idea_id === idea.id)
            tags.forEach(tag => ideaTagSet.add(tag.tag_name))
            let notEmpty = false
            for (let element of filter) {
                if (ideaTagSet.has(element)) {
                    notEmpty = true
                }
            }
            return notEmpty
        }
    }

    const filterIdeas = tag => {
        let filterSet = filter
        let hasTag = filterSet.delete(tag.name)
        hasTag ? setFilter(filterSet)
            : setFilter(filter.add(tag.name))
        let filteredList = allIdeas.filter(idea => intersection(idea, filter))
        setIdeas(filteredList)
    }

    return(
        <div className="addIdeaForm">
            <div className="addIdeaForm-fields">
                <Form onSubmit={addIdea}>
                    <FormGroup>
                        <Label for="idea-name" className="form-label">Idea Name</Label>
                        <Input type="text" value={ideaName} classname="form-input" id="idea-name" onChange={changeIdeaNameHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description" className="form-label">Description</Label>
                        <Input type="text" classname="form-input" id="description" onChange={changeDescriptionHandler}/>
                    </FormGroup>
                    <FormGroup>
                        <Label className="form-label">Select a Goal</Label>
                        <select>
                            {props.goals.map(goal => <option onClick={() => setGoal(goal)}>{goal.name}</option>)}
                        </select>
                    </FormGroup>
                    <Button>Add Idea</Button>
                </Form>
            </div>
            <div className="idea-picker">
                <h4>Popular Ideas</h4>
                <div className="tag-filter">
                    <h4>Filters:</h4>
                    <div className="tag-buttons">
                        {tags.map(tag => <Tag tag={tag} filter={filterIdeas}/>)}
                    </div>
                </div>
                <div className="idea-picker-list">
                    {ideas.map(idea => <div onClick={() => setIdeaName(idea.name)}>
                        <p>{idea.name}</p>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default AddIdeaForm;