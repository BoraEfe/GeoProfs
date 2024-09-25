import { useState } from 'react'
import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Login/Login'
import VakantieDagen from './Pages/Vakantiedagen/Vakantiedagen'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'



const App = () => {
  return (
    <body>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ziekmelden" element={<Ziekmelden />} />
          <Route path="/vakantiedagen" element={<VakantieDagen />} />
        </Routes>
    </body>
  )
}

export default App
