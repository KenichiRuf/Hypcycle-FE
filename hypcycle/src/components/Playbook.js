import React from 'react';
import book from '../assets/book.png';
import {Link} from 'react-router-dom';

function Playbook(props) {
    return(
        <Link to={`/playbooks/${props.playbook.id}`}>
            <div className="playbook">
                <div className="playbook-image">
                    <img src={book} alt="playbook icon" className="playbook-icon"/>
                </div>
                <div className="playbook-content">
                    <h2>{props.playbook.name}</h2>
                </div>
            </div>
        </Link>
    )
}

export default Playbook