import './App.css';
import Login from "../login/login";
import Registration from "../registration/registration";
import Feed from "../feed/feed";
import UserPage from "../user/user";
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import PrivateRoute from "../../helpers/private-route";
import getUserData from "../../helpers/get-user-data";
import PageNotFound from "../404_page/404_page";

function App() {
    const [currentUserId, setCurrentUserId] = useState(undefined);
    const [currentUser, setCurrentUser] = useState({});
    const savedCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
    let loginLink = loginLinkHtml;

    if(savedCurrentUser && !currentUserId && Object.keys(currentUser).length === 0) {
        console.log("userLoadedFromStorage")
        setCurrentUserId(savedCurrentUser.id)
        setCurrentUser(savedCurrentUser)
        loginLink = ""
    } else if(currentUserId && Object.keys(currentUser).length === 0) {
        updateCurrentUser(currentUserId)
            .then(({result})=> {
                setCurrentUser(result)
            })
        loginLink = ""
    }

    return (<Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    {loginLink}
                    <li>
                        <Link to="/messages">Chats</Link>
                    </li>
                    <li>
                        <Link to="/messages/6">Chat with user 6</Link>
                    </li>
                    <li>
                        <Link to="/user/5">user5</Link>
                    </li>
                    <li>
                        <Link to="/user/6">user6</Link>
                    </li>
                </ul>

                <hr/>

                <Switch>
                    {/*<Route
                        exact
                        path="/"
                        render={() => {
                            return (
                                currentUserId ?
                                    <Redirect to="/home" /> :
                                    <Redirect to="/login" />
                            )
                        }}
                    />*/}
                    <Route exact path="/">
                        <Feed userId={1}/>
                    </Route>
                    <Route path="/login">
                        <Login setCurrentUserId={setCurrentUserId}/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                    <PrivateRoute path={"/user/:id"}
                                  currentUser={currentUser}
                                  render={(props) => {
                                      return <UserPage {...props}/>;
                                  }}/>
                    <Route component={PageNotFound}/>
                </Switch>
            </div>
        </Router>
    );
}

const updateCurrentUser = (currentUserId) => {
    console.log("updateCurrentUser")
    return getUserData(currentUserId)
}

const loginLinkHtml = (<li><Link to="/login">Login</Link></li>)

export default App;
