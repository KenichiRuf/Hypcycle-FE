import React, {useState} from 'react';

function User(props) {

    return(
        <div>
            <p>{props.user.email}</p>
        </div>
    )
}

export default User