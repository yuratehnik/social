import './App.css';
import Login from "../login/login";
import Registration from "../registration/registration";
import Feed from "../feed/feed";
import React, {useState} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    const rootPage = isUserLoggedIn ? <Feed/> : <Registration/>;

    return (<Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/registration">Registration</Link>
                    </li>
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/">
                        {rootPage}
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/registration">
                        <Registration/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
