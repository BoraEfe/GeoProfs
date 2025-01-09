import Header from './Components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'
import Verlofaanvraag from './Pages/Verlofaanvraag/Verlofaanvraag'
import VakantieDagen from './Pages/Vakantiedagen/Vakantiedagen'
import { UserProvider } from './functions/context/User'
import AddUser from './pages/AddUser/AddUser'
import ChangeTemporaryPassword from './components/ChangeTemporaryPassword/ChangeTemporaryPassword'
import AdminPage from './Pages/admin/adminpage'

const App = () => {
  
  if(window.location.pathname === '/' || window.location.pathname === '/ziekmelden' || window.location.pathname === '/verlofaanvraag' || window.location.pathname === '/vakantiedagen'){
    return (
      <>
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
            <Route path="/admin" element={<AdminPage/>}/>
          </Routes>
        </UserProvider>
      </>
    )
  } else 
  {
    return (
      <>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/ziekmelden" element={<Ziekmelden />} />
            <Route path="/verlofaanvraag" element={<Verlofaanvraag />} />
            <Route path="/vakantiedagen" element={<VakantieDagen />} />
            <Route path="/AddUser" element={<AddUser/>}/>
            <Route path="/changeTemporaryPassword" element={<ChangeTemporaryPassword/>}/>
            <Route path="/admin" element={<AdminPage/>}/>
            </Routes>
        </UserProvider>
      </>
    )
  }
}

export default App