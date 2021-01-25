import React from 'react'
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import axios from 'axios';
import DoubleCheckMark from '../assets/icons/DoubleCheckMark';
import XCircle from '../assets/icons/XCircle';

const ResetPassword = () => {
    const [currentPassword,setCurrentPassword] = useState()
    const [newPassword,setNewPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    const [match, setMatch] = useState(true)
    const [registered, setRegistered] = useState(false)
    const [error, setError] = useState("")

    const changeCurrentPasswordHandler = e => {
        setCurrentPassword(e.target.value)
    }
    const changeNewPasswordHandler = e => {
        setNewPassword(e.target.value)
    }
    const changeConfirmPasswordHandler = e => {
        setConfirmPassword(e.target.value)
    }

    const resetPassword = event => {
        event.preventDefault()
        setError("")
        if(newPassword === confirmPassword) {
            axios.put(`http://localhost:4000/api/users/password/${}`, {
                password: newPassword
            })
            .then(res => setRegistered(true))
            .catch(err => setError(err.message))
        }
    }

    useEffect(() => {
        if(newPassword === confirmPassword) {
            setMatch(true)
        } else {
            setMatch(false)
        }
    })

    return(
        <div>
            <Form>
                <FormGroup>
                    <Label for="current-password" className="registration-label">Current Password</Label>
                    <Input type="password" className="registration-input" id="current-password" onChange={changeCurrentPasswordHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="new-password" className="registration-label">New Password</Label>
                    <Input type="password" className="registration-input" id="new-password" onChange={changeNewPasswordHandler}/>
                </FormGroup>
                <FormGroup>
                    <Label for="confirm-password" className="registration-label">Confirm New Password {match ? DoubleCheckMark : XCircle}</Label>
                    <Input type="cpassword" className="registration-input" id="confirm-password" onChange={changeConfirmPasswordHandler}/>
                </FormGroup>
            </Form>
            {registered ? <Redirect to="/login" /> : null}
        </div>
    )
}

export default ResetPassword;