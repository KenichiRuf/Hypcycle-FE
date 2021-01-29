import React, { useEffect } from 'react'
import Experiment from './Experiment';
import {Button} from 'reactstrap';

const ExperimentList = (props) => {
      
    return(
       <ul className="idea-list">
            {props.experiments.length === 0
            ? <div>
                <p>You haven't started any experiments yet.</p>
                <a href="/experiments"><Button>Create Experiment</Button></a>
            </div>
            : props.experiments.map(experiment =>
                <li>
                    <Experiment experiment={experiment}/>
                </li>
            )}
        </ul>
    )
}

export default ExperimentList;