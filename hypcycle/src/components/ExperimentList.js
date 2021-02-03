import React from 'react'
import Experiment from './Experiment';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

const ExperimentList = (props) => {
      
    return(
       <ul className="idea-list">
            {props.experiments.length === 0
            ? <div>
                <p>You haven't started any experiments yet.</p>
                <Link to="/experiments"><Button>Create Experiment</Button></Link>
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