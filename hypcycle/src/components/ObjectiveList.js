import React from 'react'
import Objective from './Objective';

const ObjectiveList = (props) => {
      
    return(
       <div className="objective-list">
            {props.objectives.map(objective =>
                <div>
                    <Objective objective={objective} plays={props.plays.filter(play => play.objective_id === objective.id)}/>
                </div>
            )}
        </div>
    )
}

export default ObjectiveList;