import React from "react";
import {Link} from "react-router-dom";


const Feed = ({userId}) => {
    return(
        <>
            <li>
                <Link to="/user/5">user5</Link>
            </li>
            <li>
                <Link to="/user/6">user6</Link>
            </li>
            Home page
        </>
    )
}

export default Feed;