import React, {useState} from "react";

const Login = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

    return(
        <>
            here some login <br/>
            server response:
            <form onSubmit={(e)=>onLoginSubmit(e, setIsUserLoggedIn)} method="POST">
                <label htmlFor="email-input">
                    <input type="text" id="email-input" name="email" placeholder="Email" required={true}/>
                </label>
                <label htmlFor="password-input">
                    <input type="password" id="password-input" name="pass" placeholder="Password" required={true}/>
                </label>
                <input type="submit" value="Login"/>
            </form>
        </>
    )
}

const onLoginSubmit = ( e , setIsUserLoggedIn ) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    loginRequest({
        email : formData.get("email"),
        pass : formData.get("pass"),
    })
        .then((res)=>{
            return res.json()
        })
        .then((data) => {
            setIsUserLoggedIn(data.result)
            console.log(data.result)
        })
        .catch((err)=>{
            console.error("Error: ",err)
        })
}

const loginRequest = async (bodyParams) => {
    const params = {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({...bodyParams})
        };
    const url = "//127.0.0.1:3001/login";
    const result = await fetch(url, params);

    return result;
}

export default Login;