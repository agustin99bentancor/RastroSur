import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Homepage from './pages/home.jsx'
import Header from './component/header.jsx';

function App() {
  return (
    <div> 
      <Header/>
      <Routes> 
        <Route path="/home" element={<Homepage />}></Route> 
      </Routes>
    </div>
  );
};


export default App
