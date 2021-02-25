import React from 'react'
import Playbook from './Playbook';

const PlaybookList = (props) => {
      
    return(
       <div className="playbook-list">
            {props.playbooks.map(playbook =>
                <Playbook playbook={playbook}/>
            )}
        </div>
    )
}

export default PlaybookList;