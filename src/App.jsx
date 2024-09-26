import { useState } from 'react'
import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Login/Login'
import VakantieDagen from './Pages/Vakantiedagen/Vakantiedagen'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'
import Verlofaanvraag from './Pages/Verlofaanvraag/Verlofaanvraag'
import VakantieDagen from './Pages/VakantieDagen/VakantieDagen'



const App = () => {
  return (
    <body>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ziekmelden" element={<Ziekmelden />} />
        </Routes>
    </body>
  )
}

export default App
