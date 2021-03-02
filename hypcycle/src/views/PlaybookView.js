import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import ObjectiveList from '../components/ObjectiveList';
import Header from '../components/Header';
import {Spinner} from 'reactstrap';
import axios from 'axios';

function PlaybookView(props) {

    const [playbook, setPlaybook] = useState()
    const [plays, setPlays] = useState([])
    const [objectives, setObjectives] = useState([])
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    const stopLoading = () => setLoading(false)

    useEffect(() => {
        axios.get(`/api/playbooks/playbook/${props.match.params.id}`)
            .then(res => {
                setPlaybook(res.data.playbook)
                setPlays(res.data.plays)
                setObjectives(res.data.objectives)
                setTimeout(stopLoading, 1000)
            })
            .catch(err => {
                setError(err)
                setTimeout(stopLoading, 1000)
            })
    }, [props.match.params.id])

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    {loading ? <div className="loading-indicator">
                        <Spinner style={{width: "200px", height: "200px"}} color="info" />
                    </div>
                    :<div>
                        <div className="title-buttons">
                            {playbook ? <h1>{playbook.name} Playbook</h1> : null}
                        </div>
                        <div>
                            <h2>Objectives</h2>
                            {objectives.length === 0
                            ? <p>Your Playbook has no Objectives.</p>
                            : <ObjectiveList objectives={objectives} plays={plays}/>}
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default PlaybookView;