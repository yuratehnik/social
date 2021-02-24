import getMessagesList from "../../helpers/get-messages";
import messageSend from "../../helpers/send-message";
import SingleChatMessage from "../single_chat_message/single_chat_message";
import React, {useState, useEffect} from "react";

const SingleChat = (props) => {
    const [message, setMessage] = useState("");
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [messagesList, setMessagesList] = useState([]);

    const chat_id = parseInt(props.match.params.id);

    useEffect(()=>{
        console.log("effect messages List")
        console.log(isDataLoading)
        if(!isDataLoading) {
            setIsDataLoading(true)
            getMessagesList({chat_id, page: 1})
                .then((res)=>{
                    console.log("get messages list result", res.result)
                    setMessagesList(generateMessagesDOM(res.result))
                    setIsDataLoading(false)
                })
        }
    }, [messagesList])

    return(
        <>Chat: {chat_id}<br/>
        <ul className="messages-wrapper">
            {messagesList}
        </ul>
            <form onSubmit={(e)=>messageSend(e, {id: chat_id, message})}>
                <label><textarea id="message" name="message" placeholder="Type your message" onChange={(e)=> {setMessage(e.target.value)}} value={message}/></label>
                <input type="submit"/>
            </form>
        </>
    )
};

const generateMessagesDOM = (array) => {
    return array.map((item)=>{
        return <SingleChatMessage item={{text: item.text, date: item.publish_date, user_id: item.user_id}}/>
    })
}

export default SingleChat