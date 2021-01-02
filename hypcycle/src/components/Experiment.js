import React, {useState, useEffect} from 'react';
import {Button, Modal} from 'reactstrap';
import binomialCDF from '../functions/binomialCDF';
import UpdateExperimentForm from './updateExperimentForm';

function Experiment(props) {

    const confidence = binomialCDF(props.experiment.trials, props.experiment.successes, props.experiment.target_success_rate)

    const [updateModal, setUpdateModal] = useState(false)

    const toggleUpdateModal = () => setUpdateModal(!updateModal)

    return(
        <div className="experiment">
            <div className="experiment-content">
                <h2 className="experiment-description">{props.experiment.description}</h2>
                <div className="experiment-stats">
                    <p className="experiment-stat">Trials: {props.experiment.trials}</p>
                    <p className="experiment-stat">Successes: {props.experiment.successes}</p>
                    <p className="experiment-stat">Target Success Rate: {props.experiment.target_success_rate}</p>
                    <p className="experiment-stat confidence-level">Confidence Level: {confidence}</p>
                </div>
            </div>
            <div className="experiment-buttons">
                <Button className="update-button" onClick={() => toggleUpdateModal()}>Update Progress</Button>
                <Button className="add-to-playbook-button">Add To Playbook</Button>
            </div>
            <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
                <UpdateExperimentForm toggle={toggleUpdateModal} experiment={props.experiment}/>
            </Modal>
        </div>
    )
}

export default Experiment