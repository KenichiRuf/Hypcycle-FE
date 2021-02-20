import React from 'react';
import {RadialChart} from 'react-vis';

function DashboardChart(props) {
    return(
        <div className="dashboard-chart">
            <h4 className="dashboard-chart-title">{props.goal.name}</h4>
            <RadialChart 
                data={[{angle: props.goal.goal_value - props.goal.current_value}, {angle: props.goal.current_value - props.goal.start_value}]}
                height={200}
                width={200}
            />
            <span>Progress: {`${Math.round(10000*(props.goal.current_value-props.goal.start_value)/(props.goal.goal_value-props.goal.start_value))/100}%`}</span>
        </div>
    )
}

export default DashboardChart;