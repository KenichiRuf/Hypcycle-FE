import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal, Spinner} from 'reactstrap';
import SortIcon from '../assets/icons/SortIcon';
import AddPlaybookForm from '../components/AddPlaybookForm';
import PlaybookList from '../components/PlaybookList';
import Axios from 'axios';


function Playbooks () {

    const [playbooks, setPlaybooks] = useState([])
    const [addPlaybookModal, setAddPlaybookModal] = useState(false)
    const [loading, setLoading] = useState(true)

    const stopLoading = () => setLoading(false)

    const toggleAddPlaybookModal = () => setAddPlaybookModal(!addPlaybookModal)

    useEffect(() => {
        Axios.get(`http${process.env.DOMAIN}/api/playbooks/${localStorage.getItem("orgId")}`)
            .then(res => {
                setPlaybooks(res.data.playbooks)
                setTimeout(stopLoading, 1000)
            })
            .catch(err => {
                setTimeout(stopLoading, 1000)
                console.log(err)
            })
    })

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
                            {playbooks.length === 0
                                ? <div>
                                    <p>You haven't created any playbooks yet.</p>
                                    <Button onClick={() => setAddPlaybookModal(true)}>+Add Playbook</Button>
                                </div>
                                : <PlaybookList playbooks={playbooks} setPlaybooks={setPlaybooks}/>
                            }
                        </div>
                    }
                </div>
            </div>
            <Modal isOpen={addPlaybookModal} toggle={toggleAddPlaybookModal}>
                <AddPlaybookForm setPlaybooks={setPlaybooks}/>
            </Modal>
        </div>
    )
}

export default Playbooks;