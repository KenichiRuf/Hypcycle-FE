import React from 'react';
import {Progress} from 'reactstrap';

function ProgressBar(props) {
    const currentValue = props.current
    const startValue = props.goal["start_value"]
    const goalValue = props.goal["goal_value"]
    const pace = Math.round(startValue + props.pace*(goalValue-startValue))

    if(currentValue < pace) {
        return(
            <div className="progress-bar-container">
                <div className="progress-bar-labels">
                    <span>Current: {currentValue}</span>
                    <span>Pace: {pace}</span>
                    <span>Goal: {goalValue}</span>
                </div>
                <Progress min={startValue} multi className={props.status}>
                    <Progress bar className="bg-info" value={currentValue-startValue} max={goalValue-startValue} />
                    <Progress bar striped className="bg-warning pace" value={pace - currentValue} max={goalValue-startValue} />
                    <Progress bar className="bg-white text-dark" value={goalValue - pace} max={goalValue-startValue} />
                </Progress>
            </div>
        )
    } else if(currentValue < goalValue) {
        return(
            <div className="progress-bar-container">
                <div className="progress-bar-labels">
                    <span>Current: {currentValue}</span>
                    <span>Pace: {pace}</span>
                    <span>Goal: {goalValue}</span>
                </div>
                <Progress min={startValue} multi className={props.status}>
                    <Progress bar className="bg-info pace" value={pace - startValue} max={goalValue-startValue} />
                    <Progress bar className="bg-info" value={currentValue-pace} max={goalValue-startValue} />
                    <Progress bar className="bg-white text-dark" value={goalValue - pace} max={goalValue-startValue} />
                </Progress>
            </div>
        )
    } else if(currentValue === goalValue) {
        return(
            <div className="progress-bar-container">
                <div className="progress-bar-labels">
                    <span>Current: {currentValue}</span>
                    <span>Pace: {pace}</span>
                    <span>Goal: {goalValue}</span>
                </div>
                <Progress min={startValue} multi className={props.status}>
                    <Progress bar className="bg-info pace" value={pace - startValue} max={goalValue-startValue} />
                    <Progress bar className="bg-info" value={currentValue-pace} max={goalValue-startValue} />
                </Progress>
            </div>
        )
    } else {
        return(
            <div className="progress-bar-container">
                <div className="progress-bar-labels">
                    <span>Current: {currentValue}</span>
                    <span>Pace: {pace}</span>
                    <span>Goal: {goalValue}</span>
                </div>
                <Progress min={startValue} multi className={props.status}>
                    <Progress bar className="bg-info pace" value={pace - startValue} max={currentValue-startValue} />
                    <Progress bar className="progress-bar-goal bg-info" value={goalValue-pace} max={currentValue-startValue} />
                    <Progress bar className="bg-success" value={currentValue-goalValue} max={currentValue-startValue} animated/>
                </Progress>
            </div>
        )
    }
}

export default ProgressBar;