import React, {useState} from "react";

const Registration = () => {
    const [isRegistered, setIsRegistered] = useState(false)

    return(
        <>
            <form onSubmit={(e)=>onRegisterSubmit(e, setIsRegistered)} method="POST">
                <label htmlFor="name-input">
                    <input type="text" id="name-input" name="name" placeholder="Name" required={true}/>
                </label>
                <label htmlFor="email-input">
                    <input type="text" id="email-input" name="email" placeholder="Email" required={true}/>
                </label>
                <label htmlFor="password-input">
                    <input type="password" id="password-input" name="pass" placeholder="Password" required={true}/>
                </label>
                <input type="submit" value="Register"/>
            </form>
        </>
    )
}

const onRegisterSubmit = ( e , setIsRegistered ) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    registrationRequest({
        name : formData.get("name"),
        email : formData.get("email"),
        pass : formData.get("pass"),
    })
        .then((res)=>{
            return res.json()
        })
        .then((data) => {
            setIsRegistered(data.result)
            console.log(data.result)
        })
        .catch((err)=>{
            console.error("Error: ",err)
        })
}

const registrationRequest = async (bodyParams) => {
    const params = {
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({...bodyParams})
    };
    const url = "//127.0.0.1:3001/registration";
    const result = await fetch(url, params);

    return result;
}

export default Registration;