import React, {useEffect, useState} from 'react';
import PlayList from '../components/PlayList';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Spinner} from 'reactstrap';
import axios from 'axios';

function PlaybookView(props) {

    const [playbook, setPlaybook] = useState()
    const [plays, setPlays] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)

    const stopLoading = () => setLoading(false)

    useEffect(() => {
        axios.get(`/api/playbooks/playbook/${props.match.params.id}`)
            .then(res => {
                console.log(res.data)
                setPlaybook(res.data.playbook)
            })
            .catch(err => setError(err))
        axios.get(`/api/plays/${props.match.params.id}`)
            .then(res => {
                setPlays(res.data.plays)
                setTimeout(stopLoading, 1000)
            })
            .catch(err => setError(err))
    }, [props.match.params.id])

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <div className="title-buttons">
                        {playbook ? <h1>{playbook.name}</h1> : null}
                    </div>
                    {loading ? <div className="loading-indicator">
                                <Spinner style={{width: "200px", height: "200px"}} color="info" />
                            </div>
                            : <div>
                                <PlayList plays={plays}/>
                                <p>{error}</p>
                            </div>
                        }
                </div>
            </div>
        </div>
    )
}

export default PlaybookView;