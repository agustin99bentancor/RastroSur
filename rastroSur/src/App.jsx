import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Homepage from '../pages/home.jsx'

function App() {
  return (
    <div> 

    <nav>
      <Link to="/home" className="nav-item">Homepage</Link>
      <Link to="/about" className="nav-item">About Little Lemon</Link>
      <Link to="/contact" className="nav-item">Contact</Link>
    </nav>
      <Routes> 

        <Route path="/home" element={<Homepage />}></Route> 
      </Routes>
    </div>
  );
};


export default App
