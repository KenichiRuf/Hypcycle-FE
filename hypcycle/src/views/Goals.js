import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal, Spinner} from 'reactstrap';
import FilterIcon from '../assets/icons/FilterIcon';
import Goal from '../components/Goal';
import AddGoalForm from '../components/AddGoalForm';
import Axios from 'axios';
import domain from '../globalVariables/domain';

function Goals () {
    const [goalList, setGoalList] = useState([])
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const stopLoading = () => {
        setLoading(false)
    }

    useEffect(() => {
        Axios.get(`${domain}/api/goals/${localStorage.getItem("orgId")}`)
            .then(function(res){
                setGoalList(res.data.goals)
                setTimeout(stopLoading, 1000)
            })
            .catch(function(err){
                setTimeout(stopLoading, 1000)
            })
    }, [])

    const toggle = () => {setModal(!modal)}

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <div className="title-buttons">
                        <h1>Goals</h1>
                        <Button onClick={toggle}>+Add Goal</Button>
                        <Button>Filter {FilterIcon}</Button>
                    </div>
                    {loading ? <div className="loading-indicator">
                            <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        </div>
                        : <div className="goal-list">
                            {goalList.length === 0
                                ? <div>
                                    <p>You haven't created any goals yet.</p>
                                    <Button onClick={toggle}>+Add Goal</Button>
                                </div>
                                : goalList.map(goal => <Goal goal={goal}/>)}
                        </div>    
                    }
                </div>
            </div>
            <Modal isOpen={modal} toggle={toggle} size="lg">
                <AddGoalForm toggle={toggle} setGoalList={setGoalList} goals={goalList}/>
            </Modal>
        </div>
    )
}

export default Goals