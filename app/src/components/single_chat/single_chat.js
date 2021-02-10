import React from "react";

const SingleChat = (props) => {
    const id = parseInt(props.match.params.id);
    return(
        <>Chat: {id}</>
    )
};

export default SingleChat