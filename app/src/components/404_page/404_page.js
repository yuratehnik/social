import React from "react";
import {Link} from "react-router-dom"

const PageNotFound = () => {
    return(
        <>
            <h1>
                404 ERROR, Page not found! <br/>
                Return to <Link to="/">home</Link>.
            </h1>
        </>
    )
}

export default PageNotFound