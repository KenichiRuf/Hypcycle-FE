import React from 'react'
import Play from './Play';

const PlayList = (props) => {
      
    return(
       <ul className="playbook-list">
            {props.plays.map(play =>
                <li>
                    <Play play={play}/>
                </li>
            )}
        </ul>
    )
}

export default PlayList;