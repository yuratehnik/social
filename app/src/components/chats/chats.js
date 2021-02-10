import React from "react";
import {Link} from "react-router-dom";

const Chats = (props) => {

    return(
        <>
            <Link to="/chat/6">Chat with user 6</Link><br/>
            Chats list {props.test}
            </>
    )
};

export default Chats;