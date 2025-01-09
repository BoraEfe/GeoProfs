import Header from './Components/Header/Header'
import HomePage from './pages/HomePage/HomePage'
import Login from './pages/Login/Login'
import './App.css'
import { Routes, Route} from 'react-router-dom'
import Verlofaanvraag from './Pages/Verlofaanvraag/Verlofaanvraag'
import VakantieDagen from './Pages/Vakantiedagen/Vakantiedagen'
import { UserProvider } from './functions/context/User'
import AddUser from './pages/AddUser/AddUser'
import ChangeTemporaryPassword from './components/ChangeTemporaryPassword/ChangeTemporaryPassword'
import { useLocation } from 'react-router-dom';

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
        <Route path="/vakantiedagen" element={<VakantieDagen />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/changeTemporaryPassword" element={<ChangeTemporaryPassword />} />
      </Routes>
    </UserProvider>
  );
};

export default App;