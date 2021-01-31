import React from 'react';
import {RadialChart} from 'react-vis';

function DashboardChart(props) {
    return(
        <div className="dashboard-chart">
            <h4 className="dashboard-chart-title">{props.goal.name}</h4>
            <RadialChart 
                data={[{angle: props.goal.goal_value - props.goal.current_value}, {angle: props.goal.current_value - props.goal.start_value, label: `${100*(props.goal.current_value-props.goal.start_value)/(props.goal.goal_value-props.goal.start_value)}%`}]}
                height={200}
                width={200}
                labelsRadiusMultiplier={.6}
                showLabels
            />
        </div>
    )
}

export default DashboardChart;