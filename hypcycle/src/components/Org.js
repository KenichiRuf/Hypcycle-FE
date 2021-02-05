import React from 'react';

function Org(props) {
    return(
        <div className="org" onClick={() => props.chooseOrg(props.orgId, props.orgUserId)}>
            <h3>{props.name}</h3>
        </div>
    )
}

export default Org;