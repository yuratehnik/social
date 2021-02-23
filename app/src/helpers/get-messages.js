import config from "../config/config";
import getTokenHeader from "./get-token-header";
import {successSignal, errorSignal} from "./rest-status-filter";
import PropTypes from 'prop-types';

//TODO should update chat id default value
const getMessagesList = async ({chat_id, page}) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const res = await fetch(config.serverFullAddress + "/messages/" + chat_id + "?page=" + page, {
        headers : {
            ...getTokenHeader(),
            currentUserId : currentUser.id
        }
    } )
        .then(res => successSignal(res))
        .catch((err) => errorSignal(err))

    return res
}

getMessagesList.propTypes = {
    chat_id: PropTypes.number,
    page: PropTypes.number
}

export default getMessagesList