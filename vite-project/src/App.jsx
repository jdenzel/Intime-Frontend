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
import Clockout from "./components/Clockout"
import { Provider } from "react-redux";
import store from "./redux/store";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.withCredentials = true;

function MainApp() {
  const [user, setUser] = useState(null);
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    //auto logs in user
    axios.get("https://dtesting.applikuapp.com/checksession/")
      .then((r) => {
        if (r.status === 200) {
          setUser(r.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clockin" element={<Clockin user={user} date={date} />} />
        <Route path="/clockout" element={<Clockout user={user} date={date} />} />
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
