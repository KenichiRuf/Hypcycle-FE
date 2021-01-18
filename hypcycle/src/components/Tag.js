import React, {useState} from 'react';

function Tag(props) {

    const [active, setActive] = useState(false)

    return(
        <div className={active ? "tag selected" : "tag"} onClick={() => setActive(!active)}>
            <span className="tag-name">{props.tag.name}</span>
        </div>
    )
}

export default Tag