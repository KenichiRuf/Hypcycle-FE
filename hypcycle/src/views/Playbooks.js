import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal, Spinner} from 'reactstrap';
import SortIcon from '../assets/icons/SortIcon';
import AddPlaybookForm from '../components/AddPlaybookForm';
import PlaybookList from '../components/PlaybookList';
import Axios from 'axios';


function Playbooks () {

    const [defaultPlaybooks, setDefaultPlaybooks] = useState([])
    const [customPlaybooks, setCustomPlaybooks] = useState([])
    const [addPlaybookModal, setAddPlaybookModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const stopLoading = () => setLoading(false)

    const toggleAddPlaybookModal = () => setAddPlaybookModal(!addPlaybookModal)

    useEffect(() => {
        Axios.get(`/api/playbooks/1`)
            .then(res => {
                setDefaultPlaybooks(res.data.playbooks)
                setTimeout(stopLoading, 1000)
            })
            .catch(err => {
                setTimeout(stopLoading, 1000)
            })
        Axios.get(`/api/playbooks/${localStorage.getItem("orgId")}`)
            .then(res => {
                setCustomPlaybooks(res.data.playbooks)
                setTimeout(stopLoading, 1000)
            })
            .catch(err => {
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
                        <h1>Playbooks</h1>
                        <Button onClick={() => setAddPlaybookModal(true)}>+Add Playbook</Button>
                        <Button>Sort {SortIcon}</Button>
                    </div>
                    {loading ? <div className="loading-indicator">
                            <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        </div>
                        : <div>
                            <PlaybookList playbooks={defaultPlaybooks} setPlaybooks={setDefaultPlaybooks}/>
                            <h2>Custom Playbooks</h2>
                            {customPlaybooks.length === 0
                                ? <div>
                                    <p>You haven't created any playbooks yet.</p>
                                    <Button onClick={() => setAddPlaybookModal(true)}>+Add Playbook</Button>
                                </div>
                                : <PlaybookList playbooks={customPlaybooks} setPlaybooks={setCustomPlaybooks}/>
                            }
                        </div>
                    }
                </div>
            </div>
            <Modal isOpen={addPlaybookModal} toggle={toggleAddPlaybookModal}>
                <AddPlaybookForm setPlaybooks={setCustomPlaybooks}/>
            </Modal>
        </div>
    )
}

export default Playbooks;