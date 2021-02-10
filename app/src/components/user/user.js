import React, {useState, useEffect} from "react";
import Loader from "../loader/loader";
import PropTypes from 'prop-types';
import getUserData from "../../helpers/get-user-data";
import {Redirect, Link} from "react-router-dom";

const UserPage = (props) => {
    const [user, setUser] = useState(false)
    const [error, setError] = useState(false)
    const id = parseInt(props.match.params.id);

    useEffect(()=>{
        if(user.id !== id) {
            getUserData(id)
                .then(({result, status, message = ""})=> {
                    if(status === 200 && result) {
                        setUser({
                            id,
                            name : result.name,
                            email : result.email
                        })
                        setError(false);
                    } else if(status === 404) {
                        setError(<Redirect to="/404"/>);
                    } else {
                        setError(`Error: ${message}`);
                        setUser(false);
                    }
                })
                .catch(({message, status})=>{
                    setError(`Error (${status}): ${message}`);
                    setUser(false);
                })
        }
    })

    let content;

    if(user) {
        const link = `/chat/${id}`
        content = <>Here is {user.name}, email: {user.email}, with id: {user.id} <Link to={link}>Write message</Link></>
    } else if(error) {
        content = error
    } else {
        content =  <Loader/>
    }



    return(
        <>
            {content}
        </>
    )
}

UserPage.propTypes = {
    id: PropTypes.number
}

UserPage.defaultProps = {
    id: 0
}

export default UserPage;