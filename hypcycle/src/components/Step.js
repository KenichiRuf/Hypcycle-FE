import React from 'react';

function Step(props) {

    return(
        <div className="step">
            <input className="checkbox" type="checkbox" id={props.step.id}/>
            <label for={props.step.id} className="step-description">Step {props.order}: {props.step.description}</label>
        </div>
    )
}

export default Step;