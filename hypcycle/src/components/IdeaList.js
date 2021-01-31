import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Idea from './Idea';
import axios from 'axios';


const IdeaList = (props) => {

    const handleOnDragEnd = result => {
        if(!result.destination) return;
        const items = Array.from(props.ideas);
        const reference = result.destination.index > result.source.index || result.destination.index === 0
            ? items[result.destination.index]
            : items[result.destination.index - 1]
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        props.setIdeas(items);
        
        axios.put(`${process.env.DOMAIN}/api/ideas/move`, {
            idea: reorderedItem,
            reference: reference,
            head: result.destination.index === 0 ? true : false
        })
        .then(function(res) {
            console.log(res)
        })
        .catch(function(err) {
            console.log(err)
        })
    }

    console.log(props.ideas)
      
    return(
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="idea-list">
                {(provided) => (
                    <ul className="idea-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {props.ideas.map((idea, index) =>
                                <Draggable key={idea.id} draggableId={idea.id.toString()} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Idea idea={idea}/>
                                        </li>
                                    )}
                                </Draggable>
                            )
                        }
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default IdeaList;