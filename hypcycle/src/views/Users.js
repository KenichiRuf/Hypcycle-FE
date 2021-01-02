import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Users () {
    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <h1>Users</h1>
                </div>
            </div>
        </div>
    )
}

export default Users;