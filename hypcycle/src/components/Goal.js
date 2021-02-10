import React, {useState, useEffect} from 'react';
import ProgressBar from './ProgressBar';
import {Button, Modal} from 'reactstrap';
import UpdateGoalForm from './UpdateGoalForm';
import AddIdeaFromGoal from './AddIdeaFromGoal';
import EditGoalForm from './EditGoalForm';
import axios from 'axios';

function Goal(props) {

    const [updateModal, setUpdateModal] = useState(false)
    const [addIdeaModal, setAddIdeaModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [current, setCurrent] = useState(props.goal['current_value'])
    const [status, setStatus] = useState("")
    const [ideas, setIdeas] = useState()
    const [experiments, setExperiments] = useState()
    const [goal, setGoal] = useState(props.goal)

    const toggleUpdateModal = () => setUpdateModal(!updateModal)
    const toggleAddIdea = () => setAddIdeaModal(!addIdeaModal)
    const toggleEditModal = () => setEditModal(!editModal)

    const today = new Date()
    const start = new Date(props.goal["start_date"])
    const deadline = new Date(props.goal["deadline"])

    const datediff = (begin, end) => {
        const begin_date = new Date(begin)
        const end_date = new Date(end)
        return(
            (end_date-begin_date)/(24*3600*1000)
        )
    }

    const pace = datediff(start, today)/datediff(start, deadline)

    useEffect(() => {
        if(props.goal.current_value - props.goal.start_value < pace*(props.goal.goal_value - props.goal.start_value)) {
            setStatus("behind-goal")
        } else if (props.goal.current_value < props.goal.goal_value) {
            setStatus("ahead-goal")
        } else {
            setStatus("completed-goal")
        }
    }, [props.goal.current_value, props.goal.goal_value, props.goal.start_value, pace])

    useEffect(() => {
        axios.get(`/api/ideas/goal/${props.goal.id}`)
            .then(res => setIdeas(res.data.ideas.length))
            .catch(err => console.log(err))
    }, [props.goal.id])

    useEffect(() => {
        axios.get(`/api/experiments/goal/${props.goal.id}`)
            .then(res => setExperiments(res.data.experiments.length))
            .catch(err => console.log(err))
    }, [props.goal.id])

    return(
        <div className={`goal ${status}`}>
            <div className="goal-left">
                <h2 className="goal-name">{goal.name}</h2>
                <div className="goal-buttons">
                    <Button className="edit-goal-button" onClick={() => setEditModal(true)}>Edit Goal</Button>
                    <Button className="add-idea-button" onClick={() => setAddIdeaModal(true)}>Add Idea</Button>
                </div>
            </div>
            <ProgressBar goal={props.goal} pace={pace} current={current} status={status} setUpdateModal={setUpdateModal}/>
            <div className="goal-right">
                <div>
                    <p>Experiments</p>
                    <p>{experiments}</p>
                </div>
                <div>
                    <p>Ideas</p>
                    <p>{ideas}</p>
                </div>
            </div>
            <Modal isOpen={updateModal} toggle={toggleUpdateModal}>
                <UpdateGoalForm goal={props.goal} toggle={toggleUpdateModal} update={setCurrent}/>
            </Modal>
            <Modal isOpen={addIdeaModal} toggle={toggleAddIdea}>
                <AddIdeaFromGoal goals={[props.goal]} toggle={toggleAddIdea}/>
            </Modal>
            <Modal isOpen={editModal} toggle={toggleEditModal}>
                <EditGoalForm goal={props.goal} toggle={toggleEditModal} setGoal={setGoal}/>
            </Modal>
        </div>
    )
}

export default Goal;