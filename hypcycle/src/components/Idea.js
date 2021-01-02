import React, {useState} from 'react';
import {Button, Modal} from 'reactstrap';
import UpdateIdeaForm from './UpdateIdeaForm';
import Hamburger from '../assets/icons/Hamburger';
import AddExperimentForm from './AddExperimentForm';

function Idea(props) {

    const [updateModal, setUpdateModal] = useState(false)
    const updateToggle = () => setUpdateModal(!updateModal)

    const [createExperimentModal, setCreateExperimentModal] = useState(false)
    const createExperimentToggle = () => setCreateExperimentModal(!createExperimentModal)

    const experiment = {
        name: props.idea.name,
        idea_id: props.idea.id,
        org_id: props.idea.org_id,
        status: "active",
        description: props.idea.description,
        start_date: null,
        trials: 0,
        successes: 0,
        target_success_rate: null
    }

    return(
        <div className="idea">
            <Hamburger color="black" />
            <div className="idea-content">
                <div className="idea-left">
                    <h2 className="idea-name">{props.idea.name}</h2>
                    <p className="idea-description">{props.idea.description}</p>
                </div>
                <div className="idea-right">
                    <Button className="update-idea-button" onClick={() => setUpdateModal(true)}>Edit</Button>
                    <Button className="create-experiment-button" onClick={() => setCreateExperimentModal(true)}>Create Experiment</Button>
                </div>
            </div>
            <Modal isOpen={updateModal} toggle={updateToggle}>
                <UpdateIdeaForm idea={props.idea} toggle={updateToggle} />
            </Modal>
            <Modal isOpen={createExperimentModal} toggle={createExperimentToggle}>
                <AddExperimentForm experiment={experiment} toggle={createExperimentToggle} />
            </Modal>
        </div>
    )
}

export default Idea;