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

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => { //auto logs in user
    axios.get("https://intime.applikuapp.com/checksession/")
      .then((r) => {
        if(r.status === 200)  {
          setUser(r.data)
        }
      })}, [])
  
      if (!user) return (
        <Router>
          <Routes>
            < Route path='/login' element={<Login onLogin={setUser}/>} />;
          </Routes>
        </Router>
       
      )  


  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    
  )

}

export default App
