import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardStat from '../components/DashboardStat';
import TestTubeIcon from '../assets/icons/TestTubeIcon';
import GoalIcon from '../assets/icons/GoalIcon';
import IdeaIcon from '../assets/icons/IdeaIcon';
import axios from 'axios';
import {Spinner, Button} from 'reactstrap';
import ExperimentList from '../components/ExperimentList';
import DashboardGoalChart from '../components/DashboardGoalChart';
import DashboardIdeaChart from '../components/DashboardIdeaChart';
import domain from '../globalVariables/domain';

function Dashboard () {

    const [loadingStats, setLoadingStats] = useState(true)
    const [experiments, setExperiments] = useState([])
    const [goals, setGoals] = useState([])
    const [ideas, setIdeas] = useState([])
    const [dashboardGoals, setDashboardGoals] = useState([])

    useEffect(() => {
        axios.get(`${domain}/api/dashboard/${localStorage.getItem("orgId")}`)
            .then(function(res) {
                setExperiments(res.data.data.experiments)
                setGoals(res.data.data.goals)
                setIdeas(res.data.data.ideas)
                setLoadingStats(false)
                let i
                let topGoals = []
                for(i = 0; i<Math.min(3,res.data.data.goals.length); i++) {
                    topGoals.push(res.data.data.goals[i])
                }
                setDashboardGoals(topGoals)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    {loadingStats ? <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        : <div className="dashboard-stats">
                            <DashboardStat title="ACTIVE EXPERIMENTS" value={experiments.length} icon={TestTubeIcon} metric="Experiment"/>
                            <DashboardStat title="ACTIVE GOALS" value={goals.length} icon={GoalIcon} metric="Goal"/>
                            <DashboardStat title="IDEA BACKLOG" value={ideas.length} icon={IdeaIcon} metric="Idea"/>
                        </div>
                    }
                    <div className="dashboard-charts">
                        <div className="dashboard-goal-progress dashboard-border">
                            <h3>Goal Progress</h3>
                            <div className="dashboard-goal-charts">
                                {goals.length === 0
                                ? <div>
                                    <p>You haven't set any goals yet.</p>
                                    <a href="/goals"><Button>Create Goals</Button></a>
                                </div>
                                : dashboardGoals.map(goal => <DashboardGoalChart goal={goal} />)}
                            </div>
                        </div>
                        <div className="dashboard-idea-breakdown dashboard-border">
                            <h3>Idea Breakdown</h3>
                            {ideas.length === 0
                                ? <div>
                                    <p>You haven't created any ideas yet.</p>
                                    <a href="/ideas"><Button>Create Ideas</Button></a>
                                </div>
                                : <DashboardIdeaChart ideas={ideas} />}
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