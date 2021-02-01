import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import {Button, Modal} from 'reactstrap';
import FilterIcon from '../assets/icons/FilterIcon';
import AddUserForm from '../components/AddUserForm';
import User from '../components/User';


function Users () {

    const [users, setUsers] = useState([])
    const [addUserModal, setAddUserModal] = useState(false)

    const toggleAddUserModal = () => setAddUserModal(!addUserModal)

    useEffect(() => {
        axios.get(`https://${process.env.REACT_APP_DOMAIN}/api/users/orgUsers/${localStorage.getItem("orgId")}`)
            .then(res => setUsers(res.data.orgUsers))
            .catch(err => console.log(err))
    }, [])

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <div className="title-buttons">
                        <h1>Users</h1>
                        <Button onClick={toggleAddUserModal}>+Add User</Button>
                        <Button>Filter {FilterIcon}</Button>
                    </div>
                    <div>
                        {users.map(user => 
                            <User user={user} />
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={addUserModal} toggle={toggleAddUserModal}>
                <AddUserForm setUsers={setUsers} users={users}/>
            </Modal>
        </div>
    )
}

export default Users;