import Header from './Components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import Login from './Pages/Login/Login'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'
import Verlofaanvraag from './Pages/Verlofaanvraag/Verlofaanvraag'
import VakantieDagen from './Pages/Vakantiedagen/Vakantiedagen'
import { UserProvider } from './context/User'
import AddUser from './pages/AddUser/AddUser'
import ChangeTemporaryPassword from './components/ChangeTemporaryPassword/ChangeTemporaryPassword'

const App = () => {
  return (
    <body>
      <UserProvider>
       <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ziekmelden" element={<Ziekmelden />} />
          <Route path="/verlofaanvraag" element={<Verlofaanvraag />} />
          <Route path="/vakantiedagen" element={<VakantieDagen />} />
          <Route path="/AddUser" element={<AddUser/>}/>
          <Route path="/changeTemporaryPassword" element={<ChangeTemporaryPassword/>}/>
        </Routes>
      </UserProvider>
    </body>
  )
}

export default App