import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import Login from './components/login/Login';
import { useStateValue } from './redux/StateProvider';

import './App.css';

function App() {

    const [{ user }, dispatch] = useStateValue();

    return (
        // BEM naming convention
        <div className="app">
            {
                !user ? (
                    <Login />
                ) : (
                    <div className="app__body">
                        <Router>
                            <Sidebar />
                            <Switch>
                                <Route path="/rooms/:roomId">
                                    <Chat />
                                </Route>
                                <Route path="/">
                                    <Chat />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                )
            }
        </div>
    );
}

export default App;
