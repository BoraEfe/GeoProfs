import Header from './Components/Header/Header'
import HomePage from './Pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Verlofaanvraag from './Pages/Verlofaanvraag/Verlofaanvraag'
import Admin from './Pages/admin/adminpage'
import { UserProvider } from './functions/context/User'
import AddUser from './pages/AddUser/AddUser'
import ChangeTemporaryPassword from './components/ChangeTemporaryPassword/ChangeTemporaryPassword'
import { useLocation } from 'react-router-dom';
import AanvragenGeschiedenis from './Pages/AanvragenGeschiedenis/AanvragenGeschiedenis'
import Ziekmelden from './Pages/Ziekmelden/Ziekmelden'

const App = () => {
  const location = useLocation();
  const showHeader = 
    location.pathname !== '/addUser' &&
    location.pathname !== '/Login' &&
    location.pathname !== '/ChangeTemporaryPassword';

  console.log('Huidige locatie:', location.pathname); 

  return (
    <UserProvider>
      {showHeader && <Header />} 
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/verlofaanvraag" element={<Verlofaanvraag />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/changeTemporaryPassword" element={<ChangeTemporaryPassword />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/AanvragenGeschiedenis" element={<AanvragenGeschiedenis />} />
        <Route path="/Ziekmelden" element={<Ziekmelden />} />
      </Routes>
    </UserProvider>
  );
};

export default App;