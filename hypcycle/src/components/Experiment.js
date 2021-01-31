import React, {useState} from 'react';
import {Button, Modal} from 'reactstrap';
import binomialCDF from '../functions/binomialCDF';
import UpdateExperimentForm from './UpdateExperimentForm';
import {round} from 'mathjs';
import AddPlayForm from './AddPlayForm';

function Experiment(props) {

    const confidence = binomialCDF(props.experiment.trials, props.experiment.successes, props.experiment.target_success_rate)
    
    const [updateModal, setUpdateModal] = useState(false)
    const [addPlayModal, setAddPlayModal] = useState(false)

    const toggleUpdateModal = () => setUpdateModal(!updateModal)
    const toggleAddPlayModal = () => setAddPlayModal(!addPlayModal)

    return(
        <div className="experiment">
            <div className="experiment-content">
                <h2 className="experiment-description">{props.experiment.description}</h2>
                <div className="experiment-stats">
                    <p className="experiment-stat">Trials: {props.experiment.trials}</p>
                    <p className="experiment-stat">Successes: {props.experiment.successes}</p>
                    <p className="experiment-stat">Target Success Rate: {props.experiment.target_success_rate*100}%</p>
                    <p className={confidence > .95 ? "experiment-stat success" : "experiment-stat"}>Confidence Level: {round(confidence, 4)*100}%</p>
                </div>
            </div>
            <div className="experiment-buttons">
                <Button className="update-button" color="info" onClick={() => toggleUpdateModal()}>Update Progress</Button>
                <Button className="add-to-playbook-button enabled" onClick={() => toggleAddPlayModal()} disabled={confidence > .95 ? false : true} color={confidence > .95 ? "success" : "secondary"}>Add To Playbook</Button>
            </div>
            <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
                <UpdateExperimentForm toggle={toggleUpdateModal} experiment={props.experiment}/>
            </Modal>
            <Modal isOpen={addPlayModal} toggle={toggleAddPlayModal}>
                <AddPlayForm experiment={props.experiment}/>
            </Modal>
        </div>
    )
}

export default Experiment