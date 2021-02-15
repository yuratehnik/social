import config from "../../config/config";
import getTokenHeader from "../../helpers/get-token-header";
import {successSignal, errorSignal} from "../../helpers/rest-status-filter";



import React, {useState} from "react";

const SingleChat = (props) => {
    const [message, setMessage] = useState("");
    const id = parseInt(props.match.params.id);

    return(
        <>Chat: {id}<br/>
            <form onSubmit={(e)=>messageSend(e, {id, message})}>
                <label><textarea id="message" name="message" placeholder="Type your message" onChange={(e)=> {setMessage(e.target.value)}} value={message}/></label>
                <input type="submit"/>
            </form>
        </>
    )
};

const messageSend = async (e, {id, message}) => {
    e.preventDefault();
    console.log(`message sent to chat ${id}, text ${message}`, e)

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const formData = new FormData(e.target);
    const text = formData.get("message");

    console.log(text)

    if(text && text !== "") {
        const res = await fetch(config.serverFullAddress + "/chat/" + id, {
            method: "POST",
            headers : {
                ...getTokenHeader(),
                currentUserId : currentUser.id,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body : JSON.stringify({
                text
            }),
        } )
            .then(res => successSignal(res))
            .catch((err) => errorSignal(err))

        console.log(res)
        return res
    } else {
        console.log("Empty message!")
    }
}

export default SingleChat