import React, {useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Playbooks () {
    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    <h1>Playbooks</h1>
                </div>
            </div>
        </div>
    )
}

export default Playbooks;