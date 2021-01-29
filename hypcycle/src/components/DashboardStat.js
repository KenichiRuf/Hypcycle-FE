import React from 'react';
import {Button} from 'reactstrap';

function DashboardStat(props) {
    return(
        <div className="dashboard-stat">
            <div className="dashboard-stat-left">
                <h4>{props.title}</h4>
                <p>{props.value}</p>
            </div>
            <div className="dashbaord-stat-right">
                {props.icon}
            </div>
        </div>
    )
}

export default DashboardStat;