import React, {useState} from 'react';
import {Button} from 'reactstrap';

function Tag(props) {

    const [active, setActive] = useState(false)

    return(
        <Button className={active ? "tag selected" : "tag"} onClick={setActive(!active)}>{props.tag.name}</Button>
    )
}

export default Tag