import config from "../config/config";
import getTokenHeader from "./get-token-header";
import {errorSignal, successSignal} from "./rest-status-filter";

const messageSend = async (e, {id, message}) => {
    e.preventDefault();
    console.log(`message sent to chat ${id}, text ${message}`, e)

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const formData = new FormData(e.target);
    const text = formData.get("message");

    if(text && text !== "") {
        const res = await fetch(config.serverFullAddress + "/chat/" + id, {
            method: "POST",
            headers : {
                ...getTokenHeader(),
                currentUserId : currentUser.id
            },
            body : JSON.stringify({
                text
            }),
        } )
            .then(res => successSignal(res))
            .catch((err) => errorSignal(err))
        return res
    } else {
        console.log("Empty message!")
    }
}

export default messageSend;