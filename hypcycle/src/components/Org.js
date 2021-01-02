import React from 'react';

function Org(props) {
    return(
        <div className="org" onClick={() => props.chooseOrg(props.org.id)}>
            <h2>{props.org.name}</h2>
        </div>
    )
}

export default Org;