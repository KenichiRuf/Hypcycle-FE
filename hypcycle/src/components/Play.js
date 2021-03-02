import React from 'react';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

function Play(props) {

    return(
        <div className="play">
            <div className="play-content">
                <div className="play-left">
                    <h4 className="play-name">{props.play.name}</h4>
                    <p className="play-description">{props.play.description}</p>
                </div>
                <div className="play-right">
                    <Link to={`/plays/${props.play.id}`}>
                        <Button className="use-play-button">View Play</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Play;