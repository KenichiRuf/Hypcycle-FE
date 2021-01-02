import React, { useEffect } from 'react'
import Experiment from './Experiment';

const ExperimentList = (props) => {
      
    return(
       <ul className="idea-list">
            {props.experiments.map(experiment =>
                <li>
                    <Experiment experiment={experiment}/>
                </li>
            )}
        </ul>
    )
}

export default ExperimentList;