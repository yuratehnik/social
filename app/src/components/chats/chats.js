import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import getChatsList from "../../helpers/get-chats-list";
import config from "../../config/config";
import getTokenHeader from "../../helpers/get-token-header";
import {errorSignal, successSignal} from "../../helpers/rest-status-filter";

const Chats = (props) => {
    const[chats, setChats] = useState(false);
    let chatsArray = []

    useEffect(()=>{
        if(!chats) {
            setChats(true)
            getChatsList()
                .then((res)=>{
                    if(res.result) {
                        setChats(res)
                    } else {
                        console.error("can't get chats: ",res.status ,res.message)
                    }
                })
                .catch((err)=>{
                    console.error(err)
                })
        }
    })

    if(typeof chats === "object") {
        if(chats.result) {
            chatsArray = chats.result.map(({chat_id})=>{return chat_id})
            chatsArray = [...new Set(chatsArray)]
        } else {
            chatsArray = [chats.message]
        }
    }

    const links = chatsArray.map((item)=>{
        return(
            <div key={"chat" + item + "wrap"}>
                <Link key={"chat" + item} to={"/chat/" + item}>Chat {item} </Link>
            </div>
        )
    })

    return(
        <>
            Chats list:<br/>
            {links}

            <button onClick={()=>{}}>Create new chat</button>
        </>
    )
};

const createChatWithUser = async (user_id) => {

    const currentUser = JSON.parse(localStorage.getItem("currentUser")) ? JSON.parse(localStorage.getItem("currentUser")) : 0;

    const res = await fetch(config.serverFullAddress + "/chats/", {
        method: "POST",
        headers : {
            ...getTokenHeader(),
            currentUserId : currentUser.id
        },
        body: JSON.stringify({
            user_id
        })
    } )
        .then(res => successSignal(res))
        .catch((err) => errorSignal(err))

    console.log(res)
    return res
}

export default Chats;