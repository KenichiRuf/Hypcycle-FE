import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal} from 'reactstrap';
import FilterIcon from '../assets/icons/FilterIcon';
import AddExperimentForm from '../components/AddExperimentForm';
import ExperimentList from '../components/ExperimentList';
import axios from 'axios';

function Experiments () {

    const [modal, setModal] = useState(false)
    const [experiments, setExperiments] = useState([])

    const toggle = () => setModal(!modal)
    
    useEffect(() => {
        axios.get(`http://localhost:4000/api/experiments/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setExperiments(res.data.experiments)
            })
            .catch(function(err) {
                console.log(err)
            })
    }, [])

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <div className="title-buttons">
                        <h1>Experiments</h1>
                        <Button onClick={() => setModal(true)}>+Add Experiment</Button>
                        <Button>Filter {FilterIcon}</Button>
                    </div>
                </div>
                <ExperimentList experiments={experiments}/>
            </div>
            <Modal isOpen={modal} toggle={toggle}>
                <AddExperimentForm toggle={toggle} experiments={experiments} setExperiments={setExperiments}/>
            </Modal>
        </div>
    )
}

export default Experiments;