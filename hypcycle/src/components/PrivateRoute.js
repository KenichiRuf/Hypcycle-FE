import React from 'react';
import {Route, Redirect} from "react-router-dom";
import jwt from 'jsonwebtoken';

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        jwt.verify(localStorage.getItem("token"), process.env.REACT_APP_JWT_SECRET, function(err, decoded) {
            return(
                decoded ? <Component {...props} />
                : <Redirect to="/login" />
            )
        }
    ))} />
)

export default PrivateRoute