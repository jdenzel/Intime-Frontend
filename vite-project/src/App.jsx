import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    <Routes>
      
    </Routes>
  )

}

export default App
