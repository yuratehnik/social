import React from "react";
import PropTypes from "prop-types";
import config from "../../config/config";
import {
    Link
} from "react-router-dom";

const Login = ({setCurrentUserId}) => {

    return(
        <>

            <h1>Login</h1>
            <form onSubmit={(e)=>onLoginSubmit(e, setCurrentUserId)} method="POST">
                <label htmlFor="email-input">
                    <input type="text" id="email-input" name="email" placeholder="Email" required={true}/>
                </label>
                <label htmlFor="password-input">
                    <input type="password" id="password-input" name="pass" placeholder="Password" required={true}/>
                </label>
                <input type="submit" value="Login"/>
            </form>

            <p>Have no account? <Link to="/registration">Register now.</Link></p>
        </>
    )
}

const onLoginSubmit = ( e, setCurrentUserId ) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    loginRequest({
        email : formData.get("email"),
        pass : formData.get("pass"),
    })
        .then((res)=>{
            return res.json()
        })
        .then(({message, user}) => {
            console.log(message)
            if(user.accessToken) {
                console.log(user)
                localStorage.setItem("currentUser", JSON.stringify(user))
                setCurrentUserId(user.id)
            }
        })
        .catch((err)=>{
            console.error("Error: ",err)
        })
}

const loginRequest = async (bodyParams) => {
    const params = {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({...bodyParams})
        };
    const url = config.serverFullAddress + "/login";
    const result = await fetch(url, params);

    return result;
}

Login.propTypes = {
    setCurrentUserId : PropTypes.func
}

Login.defaultProps = {
    setCurrentUserId : ()=>{}
}

export default Login;