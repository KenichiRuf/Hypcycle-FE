import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal, Spinner} from 'reactstrap';
import SortIcon from '../assets/icons/SortIcon';
import AddIdeaForm from '../components/AddIdeaForm';
import IdeaList from '../components/IdeaList';
import Axios from 'axios';

function Ideas () {

    const [ideas, setIdeas] = useState([])
    const [modal, setModal] = useState(false)
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)

    const stopLoading = () => {
        setLoading(false)
    }

    useEffect(() => {
        Axios.get(`http://localhost:4000/api/goals/${localStorage.getItem("orgId")}`)
            .then(function(res){
                setGoals(res.data.goals)
            })
            .catch(function(err){
                setTimeout(stopLoading, 1000)
            })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:4000/api/ideas/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setIdeas(res.data.ideas)
                setTimeout(stopLoading, 1000)
            })
            .catch(function(err){
                setTimeout(stopLoading, 1000)
            })
    }, [])

    const toggle = () => setModal(!modal)

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <div className="title-buttons">
                        <h1>Ideas</h1>
                        <Button onClick={() => setModal(true)}>+Add Idea</Button>
                        <Button>Sort {SortIcon}</Button>
                    </div>
                    {loading ? <div className="loading-indicator">
                            <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        </div>
                        : <div>
                            {ideas.length === 0
                                ? <div>
                                    <p>You haven't created any ideas yet.</p>
                                    <Button onClick={toggle}>+Add Idea</Button>
                                </div>
                                : <IdeaList ideas={ideas} toggle={toggle} setIdeas={setIdeas}/>
                            }
                        </div>
                    }
                </div>
            </div>
            <Modal size="lg" isOpen={modal} toggle={toggle}>
                <AddIdeaForm toggle={toggle} ideas={ideas} setIdeas={setIdeas} goals ={goals}/>
            </Modal>
        </div>
    )
}

export default Ideas;