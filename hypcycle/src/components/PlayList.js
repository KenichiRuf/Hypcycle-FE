import React from 'react'
import Play from './Play';

const PlayList = (props) => {
      
    return(
       <div className="play-list">
            {props.plays.map(play =>
                <div>
                    <Play play={play}/>
                </div>
            )}
        </div>
    )
}

export default PlayList;