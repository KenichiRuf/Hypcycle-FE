import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal} from 'reactstrap';
import FilterIcon from '../assets/icons/FilterIcon';
import ExperimentList from '../components/ExperimentList';
import axios from 'axios';

function Experiments () {

    const [experiments, setExperiments] = useState([])
    
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
                        <Button>Filter {FilterIcon}</Button>
                    </div>
                    {experiments.length === 0
                        ? <div>
                            <p>You don't have any active experiments. Create an Experiment from one of your ideas.</p>
                            <a href="/ideas">Go to Ideas -></a>
                        </div>
                        : <ExperimentList experiments={experiments}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Experiments;