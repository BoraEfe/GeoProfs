import { useState } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import HomePage from './Pages/HomePage/HomePage'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'

const App = () => {

    return (
    <body>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/Ziekmelden" element={<Ziekmelden />}/>
        </Routes>
      <Footer />
    </body>
  )
}

export default App
