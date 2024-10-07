import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Date from '../date';  
import { useUser } from '../../context/User';
const Header = () => {
const {user} = useUser();
console.log("isLoggedIn");
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = '/login';
  }

  return (
    <header>
      <h1 onClick={() => {navigate('/')}}><strong>Geo</strong>Profs</h1>
      <div className="header-container">
      {user.uuid ? (
        <>
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/ziekmelden">Ziekmelden</a>
            </li>
            <Date/>
           <li className="logout-button" onClick={() => {handleLogout()}}>
              <a><FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen</a>
            </li>
          </ul>
        </nav>
      
          <div className="account-container">
            <strong>Logged in as</strong>
            <span>{localStorage.getItem('firstname')} {localStorage.getItem('lastname')}</span>
          </div>
          </>
        ) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;