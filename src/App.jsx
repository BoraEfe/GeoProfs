import { useState } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import HomePage from './Pages/HomePage/HomePage'
import './App.css'
import { Routes, Route} from 'react-router-dom'

const App = () => {

    return (
    <body>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
    </body>
  )
}

export default App
