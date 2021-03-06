import React, {useState, useEffect} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Spinner} from 'reactstrap';
import FilterIcon from '../assets/icons/FilterIcon';
import ExperimentList from '../components/ExperimentList';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Experiments () {

    const [experiments, setExperiments] = useState([])
    const [loading, setLoading] = useState(true)

    const stopLoading = () => setLoading(false)
    
    useEffect(() => {
        axios.get(`/api/experiments/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setExperiments(res.data.experiments)
                setTimeout(stopLoading, 1000)
            })
            .catch(function(err) {
                console.log(err)
                setTimeout(stopLoading, 1000)
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
                    {loading ? <div className="loading-indicator">
                            <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        </div>
                        : <div>
                            {experiments.length === 0
                            ? <div>
                                <p>You don't have any active experiments. Create an Experiment from one of your ideas.</p>
                                <Link to="/ideas">{"Go to Ideas ->"}</Link>
                            </div>
                            : <ExperimentList experiments={experiments}/>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Experiments;