import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import Home from "./pages/Home";
import "./App.css";
import Login from "./pages/Login";
import Navbar from "./components/NavBar";
import Clockin from "./components/Clockin";
import { Provider } from "react-redux";
import store from "./redux/store";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

function MainApp() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //auto logs in user
    axios
      .get("https://dtesting.applikuapp.com/checksession/")
      .then((r) => {
        if (r.status === 200) {
          setUser(r.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="clockin/" element={<Clockin user={user} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MainApp />
      </Router>
    </Provider>
  );
}

export default App;
