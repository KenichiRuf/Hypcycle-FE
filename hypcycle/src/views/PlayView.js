import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Button, Modal, Form, Spinner} from 'reactstrap';
import Step from '../components/Step';

function PlayView(props) {

    const [play, setPlay] = useState()
    const [steps, setSteps] = useState([])
    const [modal, setModal] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Axios.get(`/api/plays/play/${props.match.params.id}`)
            .then(res => {
                setPlay(res.data.play)
                setSteps(res.data.steps)
                setLoading(false)
            })
            .catch(err => {
                setMessage(err.message)
                setLoading(false)
            })
    }, [props.match.params.id])
    
    const toggle = () => setModal(!modal)

    const slides = [
        <Form>
            <h1>Set Your Goal</h1>
        </Form>,
        <Form>
            <h1>Choose Ideas</h1>
        </Form>
    ]

    const clickNextHandler = () => {
        if(activeIndex === slides.length - 1) {

        } else {
            setActiveIndex(activeIndex + 1)
        }
    }
    const clickBackHandler = () => {
        if(activeIndex === 0) {
            return
        } else {
            setActiveIndex(activeIndex - 1)
        }
    }

    return(
        <div className="app-container">
            <Sidebar />
            <div className="app-content">
                <Header />
                <div className="view-container">
                    {loading ? <div className="loading-indicator">
                            <Spinner style={{width: "200px", height: "200px"}} color="info" />
                        </div>
                        : <div className="play-details">
                            <h1>{play ? play.name : null}</h1>
                            <p>{play ? play.description : null}</p>
                            {steps.length === 0
                                ? <div>
                                    <p>Your play has no steps.</p>
                                    <Button onClick={toggle}>+Add Steps</Button>
                                </div>
                                : steps.map((step, index) => <Step step={step} order={index+1} steps={steps} setSteps={setSteps}/>)}
                        </div>    
                    }
                    <p>{message}</p>
                    <Modal isOpen={modal} toggle={toggle} size="lg">
                        <div className="use-play-modal">
                            {slides[activeIndex]}
                            <div className="use-play-modal-controls">
                                <Button disabled={activeIndex === 0 ? true : false} onClick={clickBackHandler}>
                                    Back
                                </Button>
                                <Button onClick={clickNextHandler}>
                                    {activeIndex === slides.length - 1 ?
                                        "Run Play" :
                                        "Next"
                                    }
                                </Button>
                            </div>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    )
}

export default PlayView;