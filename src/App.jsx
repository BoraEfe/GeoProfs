import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import Login from './Pages/Login/Login'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'
import Verlofaanvraag from './Pages/Verlofaanvraag/Verlofaanvraag'
import VakantieDagen from './Pages/VakantieDagen/VakantieDagen'
import { UserProvider } from './context/user'


const App = () => {
  return (
    <body>
      <UserProvider>
       <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ziekmelden" element={<Ziekmelden />} />
          <Route path="/vakantiedagen" element={<VakantieDagen />} />
          <Route path="/verlofaanvraag" element ={<Verlofaanvraag/>}/>
        </Routes>
      </UserProvider>
    </body>
  )
}

export default App
