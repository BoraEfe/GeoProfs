import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Date from '../date';  
import { useUser } from '../../functions/context/User';

const Header = () => {
const {user} = useUser();
const navigate = useNavigate(); 
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('uuid');
    window.location.href = '/login';
  }
  console.log(user.uuid);

  return (
    <header>
      <h1 onClick={() => {navigate('/')}}><strong>Geo</strong>Profs</h1>
      <div className="header-container">
      {sessionStorage.getItem('uuid') ? (
        <>
        <nav>
          <ul>
            <li>
              <a onClick={() => {navigate('/')}}>Home</a>
            </li>
            <li>
             <a onClick={() => {navigate('/ziekmelden')}}>Ziekmelden</a>
            </li>
            <Date/>
           <li className="logout-button" onClick={() => {handleLogout()}}>
              <a><FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen</a>
            </li>
          </ul>
        </nav>
          <div className="account-container">
            <strong>Logged in as</strong>
            <span>{sessionStorage.getItem('firstname')} {sessionStorage.getItem('lastname')}</span>
          </div>
          </>
        ) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;