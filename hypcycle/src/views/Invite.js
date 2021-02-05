import React, { useEffect, useState } from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';

const Invite = props => {

    const [redirect, setRedirect] = useState(false)
    const [message, setMessage] = useState("Logging In")

    const email = props.match.params.email
    const password = props.match.params.password

    useEffect(() => {
        axios.post("/api/auth/login", {email: email, password: password})
            .then(res => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("userId", props.match.params.userId)
                localStorage.setItem("orgId", props.match.params.orgId)
                setRedirect(true)
            })
            .catch(err => setMessage(err))
    })

    return(
        <div>
            {redirect ? <Redirect to="/reset-password" /> : <p>{message}</p>}
        </div>
    )
}

export default Invite