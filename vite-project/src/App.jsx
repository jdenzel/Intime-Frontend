import React,{ useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'
import Home from './components/Home'
import './App.css'

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("https://intime.applikuapp.com/checksession/")
      .then((r) => {
        if(r.status === 200)  {
          setUser(r.data)
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
    
  )

}

export default App
