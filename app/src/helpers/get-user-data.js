import config from "../config/config";
import getTokenHeader from "./get-token-header";

const getUserData = async (id) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const res = await fetch(config.serverFullAddress + "/user/" + id, {
        headers : {
            ...getTokenHeader(),
            currentUserId : currentUser.id
        }
    } )
        .then(res => {
            if(res.status === 404) {
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        })

    return res
}

export default getUserData