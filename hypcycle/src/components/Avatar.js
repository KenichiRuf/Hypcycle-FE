import React from 'react'
import AvatarIcon from '../assets/icons/AvatarIcon';

const Avatar = props => {
    return(
        <div className="avatar" onClick={props.onClick}>
            {AvatarIcon}
        </div>
    )
}

export default Avatar