import React from 'react';

function DashboardStat(props) {
    return(
        <div className="dashboard-stat dashboard-border">
            <div className="dashboard-stat-title">
                <h4>{props.title}</h4>
                {props.icon}
            </div>
            <div className="dashboard-stat-value">
            <span>{props.value}</span>
            </div>
        </div>
    )
}

export default DashboardStat;