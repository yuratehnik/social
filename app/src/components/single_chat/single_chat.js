import getMessagesList from "../../helpers/get-messages";
import messageSend from "../../helpers/send-message";
import React, {useState, useEffect} from "react";

const SingleChat = (props) => {
    const [message, setMessage] = useState("");
    const [isDataLoading, setIsDataLoading] = useState(false);

    const chat_id = parseInt(props.match.params.id);

    useEffect(()=>{
        console.log("effect")
        if(!isDataLoading) {
            //setIsDataLoading(true)
            getMessagesList({chat_id, page: 1})
                .then((res)=>{
                    console.log("get messages list result", res.result)
                    //setIsDataLoading(false)
                })
        }
    })

    return(
        <>Chat: {chat_id}<br/>
        <ul className="messages-wrapper">

        </ul>
            <form onSubmit={(e)=>messageSend(e, {id: chat_id, message})}>
                <label><textarea id="message" name="message" placeholder="Type your message" onChange={(e)=> {setMessage(e.target.value)}} value={message}/></label>
                <input type="submit"/>
            </form>
        </>
    )
};

export default SingleChat