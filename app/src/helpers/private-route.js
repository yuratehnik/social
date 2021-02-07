import React from "react";
import {
    Route,
    Redirect
} from "react-router-dom";

const PrivateRoute = ({ children, currentUser, ...rest }) => {
    let auth = Object.keys(currentUser).length > 0;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    rest.render({...rest, match : rest.computedMatch})
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;