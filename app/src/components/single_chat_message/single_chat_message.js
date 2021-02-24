import React from "react";

const SingleChatMessage = (props) => {
    const {text, user_id, date} = props.item;
    const messageDate = new Date(date);
    const messageDay = messageDate.getDate();
    const messageMonth = messageDate.getMonth();
    const messageHour = messageDate.getHours();
    const messageMinutes = messageDate.getMinutes();

    return(
        <li className="single-chat-message">
            <div><b>User id</b>: {user_id}</div>
            <div><b>Date</b>: {messageDay}.{messageMonth}, {messageHour}:{messageMinutes}</div>
            <div><b>Message</b>: {text}</div>
        </li>
    )
};

export default SingleChatMessage