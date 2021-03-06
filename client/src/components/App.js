import React, { useState, useEffect } from "react";
import { Router, useNavigate } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Landing from "./pages/Landing.js";
import Explore from "./pages/Explore.js";
import Trades from "./pages/Trades.js";
import Profile from "./pages/Profile.js";
import LogIn from "./pages/LogIn.js";
import NavBar from "./modules/NavBar.js";

import "../utilities.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [username, setUsername] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      // console.log(user);
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
        setUsername(user.name);
      }
    });
  }, []);

  const handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    setUsername(undefined);
    post("/api/logout");
  };

  return (
    <>
      <Router>
        <NavBar path="/" userId={userId} handleLogout={handleLogout}>
          <Landing path="/" userId={userId} />
          <Explore path="explore" userId={userId} username={username} />
          <Trades path="trades" userId={userId} />
          <Profile path="profile/:userid" userId={userId} />
          <LogIn path="login" userId={userId} handleLogin={handleLogin} />
          <NotFound default />
        </NavBar>
        <NotFound default />
      </Router>
      {/* <SideBar /> */}
    </>
  );
};

export default App;
