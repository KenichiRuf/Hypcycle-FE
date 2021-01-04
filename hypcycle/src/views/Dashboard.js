import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStat from '../components/DashboardStat';
import TestTubeIcon from '../assets/icons/TestTubeIcon';
import GoalIcon from '../assets/icons/GoalIcon';
import IdeaIcon from '../assets/icons/IdeaIcon';
import axios from 'axios';
import {Spinner} from 'reactstrap';
import ExperimentList from '../components/ExperimentList';
import {RadialChart} from 'react-vis';

function Dashboard () {

    const [loadingStats, setLoadingStats] = useState(true)
    const [experiments, setExperiments] = useState([])
    const [goals, setGoals] = useState([])
    const [ideas, setIdeas] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:4000/api/dashboard/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setExperiments(res.data.data.experiments)
                setGoals(res.data.data.goals)
                setIdeas(res.data.data.ideas)
                setLoadingStats(false)
            })
            .catch(err => console.log(err))
    }, [])

    const chartData = [{angle: 1, label: "SEO"}, {angle: 5}, {angle: 2}]

    return (
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    {loadingStats ? <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        : <div className="dashboard-stats">
                            <DashboardStat title="ACTIVE EXPERIMENTS" value={experiments.length} icon={TestTubeIcon} />
                            <DashboardStat title="ACTIVE GOALS" value={goals.length} icon={GoalIcon} />
                            <DashboardStat title="IDEA BACKLOG" value={ideas.length} icon={IdeaIcon} />
                        </div>
                    }
                    <div className="dashboard-charts">
                        <div className="dashboard-goal-progress">
                            {goals.map(goal => <div className="dashboard-chart">
                                    <h4 className="dashboard-chart-title">{goal.name}</h4>
                                    <RadialChart 
                                        data={[{angle: goal.goal_value - goal.current_value}, {angle: goal.current_value - goal.start_value, label: `${100*(goal.current_value-goal.start_value)/(goal.goal_value-goal.start_value)}%`}]}
                                        height={200}
                                        width={200}
                                        labelsRadiusMultiplier={.6}
                                        showLabels
                                    />
                                </div>
                            )}
                        </div>
                        <div className="dashboard-idea-breakdown">

                        </div>
                    </div>
                    <div className="dashboard-top-experiments">
                        <h4>TOP EXPERIMENTS</h4>
                        <ExperimentList experiments={experiments}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;