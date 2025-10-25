import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './component/home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>} />
      </Routes>
</Router>
  )
}

export default App
