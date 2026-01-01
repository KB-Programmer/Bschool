import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './component/home'
import Navbar from './component/navbar'
import Login from './component/login'
import Logout from './component/logout'
import Class from './component/class'
import Section from './component/section'
import Student from './component/student'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Navbar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/class" element={<Class />} />
          <Route path="/section" element={<Section />} />
          <Route path="/student" element={<Student />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
