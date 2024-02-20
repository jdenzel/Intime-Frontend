import React,{ useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Home from './pages/Home'
import './App.css'
import LoginForm from './components/LoginForm'
import Login from './pages/Login'

axios.defaults.xsrfCookieName='csrftoken'
axios.defaults.xsrfHeaderName='X-CSRFTOKEN'

function MainApp() {
  const [user, setUser] = useState(null);

  useEffect(() => { //auto logs in user
    axios.get("https://intime.applikuapp.com/checksession/")
      .then((r) => {
        if(r.status === 200)  {
          setUser(r.data)
        }
      })
      .catch((error) => {
        // console.error(error)
      })
    }, [])
  
      if (!user) return (
        <Login onLogin={setUser}/>
      )  

  return (
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    
  )

}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  )
}

export default App
