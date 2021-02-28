import React from 'react';

function Step(props) {

    return(
        <div className="step">
            <label for={props.step.id} className="step-description">Step {props.order}. {props.step.description}</label>
            <input type="checkbox" id={props.step.id}/>
        </div>
    )
}

export default Step;