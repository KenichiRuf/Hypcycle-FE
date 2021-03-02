import React, {useState} from 'react';
import PlayList from './PlayList';
import {Button} from 'reactstrap';

const Objective = props => {

    const [open, setOpen] = useState(false)

    const convert = () => {

    }
      
    return(
        <div className="objective">
            <div className="objective-card">
                <div>
                    <h2>{props.objective.name}</h2>
                    <span>{props.objective.description}</span>
                </div>
                <div className="objective-buttons">
                    <Button className="details-button" onClick={() => setOpen(!open)}>{open ? "Close Details" : "View Details"}</Button>
                    <Button className="import-button" onClick={convert}>Import</Button>
                </div>
            </div>
            <div className={open ? "objective-play-list" : "hide"}>
                <PlayList plays={props.plays} />
            </div>
        </div>
    )
}

export default Objective;