import React from 'react';
import {Button} from 'reactstrap';
import Clipboard from '../assets/icons/Clipboard';
import {Link} from 'react-router-dom';

function Playbook(props) {
    return(
        <div className="playbook">
            <Clipboard width={250} height={250} />
            <div className="playbook-content">
                <h2>{props.playbook.name}</h2>
                <Link to={`/playbooks/${props.playbook.id}`} className="open-playbook-button"><Button>Open</Button></Link>
            </div>
        </div>
    )
}

export default Playbook