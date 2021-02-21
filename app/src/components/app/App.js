import './App.css';
import Login from "../login/login";
import Registration from "../registration/registration";
import Feed from "../feed/feed";
import UserPage from "../user/user";
import Chats from "../chats/chats";
import SingleChat from "../single_chat/single_chat";

import React, {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PrivateRoute from "../../helpers/private-route";
import getUserData from "../../helpers/get-user-data";
import PageNotFound from "../404_page/404_page";

function App() {
    const [currentUserId, setCurrentUserId] = useState(undefined);
    const [currentUser, setCurrentUser] = useState({});
    const [loginLink, setLoginLink] = useState("");
    const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));

    if(savedCurrentUser && !currentUserId && Object.keys(currentUser).length === 0) {
        setCurrentUserId(savedCurrentUser.id)
        setCurrentUser(savedCurrentUser)
    } else if(currentUserId && Object.keys(currentUser).length === 0) {
        updateCurrentUser(currentUserId)
            .then(({result})=> {
                setCurrentUser(result)
            })
    }

    useEffect(()=>{

        if(Object.keys(currentUser).length === 0 && loginLink!==loginLinkHtml) {
            setLoginLink(loginLinkHtml)
        } else {
            setLoginLink(logoutLinkHtml)
        }
    })




    return (<Router key={currentUserId}>
            <div className="App">
                <h2>Current user id: {currentUserId}</h2>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/chats/">Messages</Link>
                    </li>
                    {loginLink}
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        <Feed userId={1}/>
                    </Route>
                    <Route path="/login">
                        <Login setCurrentUserId={setCurrentUserId}/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <PrivateRoute path={"/user/:id/"}
                                  currentUser={currentUser}
                                  render={(props) => {
                                      return <UserPage {...props}/>;
                                  }}/>
                    <PrivateRoute path={"/chats/"}
                                  currentUser={currentUser}
                                  render={(props) => {
                                      return <Chats {...props}/>;
                                  }}/>
                    <PrivateRoute path={"/chat/:id"}
                                  currentUser={currentUser}
                                  render={(props) => {
                                      return <SingleChat {...props}/>;
                                  }}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </Router>
    );
}

const updateCurrentUser = (currentUserId) => {
    return getUserData(currentUserId)
}

const loginLinkHtml = (<li><Link to="/login">Login</Link></li>)
const logoutLinkHtml = (<li><Link to="/login">Logout</Link></li>)

export default App;
