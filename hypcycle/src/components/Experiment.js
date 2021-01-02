import React, {useState, useEffect} from 'react';
import {Button} from 'reactstrap';

function Experiment(props) {

    const [confidence, setConfidence] = useState(props.experiment.successes/props.experiment.trials)

    return(
        <div className="experiment">
            <div className="experiment-content">
                <h2 className="experiment-description">{props.experiment.description}</h2>
                <div className="experiment-stats">
                    <p className="experiment-stat">Trials: {}</p>
                    <p className="experiment-stat">Successes: {}</p>
                    <p className="experiment-stat">Target Success Rate: {}</p>
                    <p className="experiment-stat">Confidence Level: {}</p>
                </div>
            </div>
            <Button>Add To Playbook</Button>
        </div>
    )
}

export default Experiment