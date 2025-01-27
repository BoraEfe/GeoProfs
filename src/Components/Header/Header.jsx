import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Date from '../date';  
import CheckUserRole from '../../functions/CheckUserRole/CheckUserRole';
import CheckForAccesToLeavePage from '../../functions/CheckForAccesToLeavePage/CheckForAccesToLeavePage';
import CheckForAccesToAddUser from '../../functions/CheckForAccesToAddUser/CheckForAccesToAddUser';

const Header = () => {
const navigate = useNavigate(); 
  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('uuid');
    window.location.href = '/Login';
  } 

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
               <CheckForAccesToLeavePage/>
            </li>
            <li>
              <CheckForAccesToAddUser/>
            </li>
            <div className='date'>
              <Date/>
            </div>
           <li className="logout-button" onClick={() => {handleLogout()}} data-testid='logout-button'>
              <a><FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen</a>
            </li>
          </ul>
        </nav>
          <div className="account-container">
            <strong>Logged in as</strong>
            <span>{sessionStorage.getItem('firstname')} {sessionStorage.getItem('lastname')},</span>
            <p><CheckUserRole/></p>
            
          </div>
          </>
        ) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;