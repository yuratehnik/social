import React, {useState, useEffect} from "react";
import Loader from "../loader/loader";
import PropTypes from 'prop-types';
import getUserData from "../../helpers/get-user-data";

const UserPage = (props) => {
    const [user, setUser] = useState(false)
    const [error, setError] = useState(false)
    const id = parseInt(props.match.params.id);

    useEffect(()=>{
        if(user.id !== id) {
            getUserData(id)
                .then(({result})=> {
                    setUser({
                        id,
                        name : result.name,
                        email : result.email
                    })
                    setError(false);
                })
                .catch((err)=>{
                    setError("User not found");
                    setUser(false);
                })
        }
    })

    let content;

    if(user) {
        content = <>Here is {user.name}, email: {user.email}, with id: {user.id}</>
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