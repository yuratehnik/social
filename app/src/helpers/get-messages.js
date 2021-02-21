import config from "../config/config";
import getTokenHeader from "./get-token-header";
import {successSignal, errorSignal} from "./rest-status-filter";
//TODO shoud update chat id default value
const getMessagesList = async ({chat_id = 2}) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const res = await fetch(config.serverFullAddress + "/messages/" + chat_id, {
        headers : {
            ...getTokenHeader(),
            currentUserId : currentUser.id
        }
    } )
        .then(res => successSignal(res))
        .catch((err) => errorSignal(err))

    return res
}

export default getMessagesList