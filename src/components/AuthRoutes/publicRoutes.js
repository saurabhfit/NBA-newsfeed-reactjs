import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
    user,
    component: Comp,
    ...rest
}) => {
    return (
        <Route {...rest} component={(props)=>(
            rest.restricted ? 
            (
                user ? 
                    <Redirect to="/dashboard"/>
                     :
                    <Comp {...props} user={user}/>
            )
            :
            <Comp {...props} user={user}/>
        )}/>
    )
}

export default PrivateRoute;