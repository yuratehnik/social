import config from "../config/config";
import getTokenHeader from "./get-token-header";
import {successSignal, errorSignal} from "./rest-status-filter";

const getUserData = async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const res = await fetch(config.serverFullAddress + "/user/" + id, {
        headers : {
            ...getTokenHeader(),
            currentUserId : currentUser.id
        }
    } )
        .then(res => successSignal(res))
        .catch((err) => errorSignal(err))

    return res
}

export default getUserData