import React, {useState} from "react";

const Login = () => {
    const [login, setLogin] = useState("")

    return(
        <>
            here some login <br/>
            server response:
            <form onSubmit={(e)=>onLoginSubmit(e, setLogin)} method="POST">
                <label htmlFor="email-input">
                    <input type="text" id="email-input" name="email" placeholder="Email" required={true}/>
                </label>
                <label htmlFor="password-input">
                    <input type="password" id="password-input" name="pass" placeholder="Password" required={true}/>
                </label>
                <input type="submit" value="Login"/> Result: {login}
            </form>
        </>
    )
}

const onLoginSubmit = ( e , setLoginEvent ) => {
    e.preventDefault()
    const formData = new FormData(e.target);
    loginRequest({
        email : formData.get("email"),
        pass : formData.get("pass")
    })
        .then((res)=>{
            return res.json()
        })
        .then((data) => {
            console.log("params", data.params)
            setLoginEvent(data.data)
        })
        .catch((err)=>{
            console.error("Error: ",err)
        })
}

const loginRequest = async ({email, pass}) => {
    const params = {
            method : "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email : email,
                pass : pass,
            })
        };
    const url = "//127.0.0.1:3001/login";
    const result = await fetch(url, params);

    return result;
}

export default Login;