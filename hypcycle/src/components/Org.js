import React from 'react';

function Org(props) {
    return(
        <div className="org" onClick={() => props.chooseOrg(props.id)}>
            <h3>{props.name}</h3>
        </div>
    )
}

export default Org;