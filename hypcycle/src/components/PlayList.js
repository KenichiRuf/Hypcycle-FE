import React from 'react'
import Play from './Play';

const PlayList = (props) => {
      
    return(
       <div className="play-list">
            {props.plays.map(play =>
                    <Play play={play} key={play.id}/>
            )}
        </div>
    )
}

export default PlayList;