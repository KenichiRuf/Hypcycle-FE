import React from 'react'
import Playbook from './Playbook';

const PlaybookList = (props) => {
      
    return(
       <ul className="playbook-list">
            {props.playbooks.map(playbook =>
                <li>
                    <Playbook playbook={playbook}/>
                </li>
            )}
        </ul>
    )
}

export default PlaybookList;