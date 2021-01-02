import React, {useState, useEffect} from 'react';
import ProgressBar from './ProgressBar';
import {Button, Modal} from 'reactstrap';
import UpdateGoalForm from './UpdateGoalForm';

function Goal(props) {

    const [modal, setModal] = useState(false)
    const [current, setCurrent] = useState(props.goal['current_value'])
    const [status, setStatus] = useState("")

    const toggle = () => setModal(!modal)

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
        if(props.goal.current_value < pace*props.goal.goal_value) {
            setStatus("behind-goal")
        } else if (props.goal.current_value < props.goal.goal_value) {
            setStatus("ahead-goal")
        } else {
            setStatus("completed-goal")
        }
    }, current)

    return(
        <div className={`goal ${status}`}>
            <div className="goal-left">
                <h2 className="goal-name">{props.goal.metric}</h2>
                <Button className="update-button" onClick={() => setModal(true)}>Update</Button>
            </div>
            <ProgressBar goal={props.goal} pace={pace} current={current} status={status}/>
            <div className="goal-right">
                <div>
                    <p>Experiments</p>
                    <p>{props.goal.experiments}</p>
                </div>
                <div>
                    <p>Ideas</p>
                    <p>{props.goal.ideas}</p>
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <UpdateGoalForm goal={props.goal} toggle={toggle} update={setCurrent}/>
            </Modal>
        </div>
    )
}

export default Goal;