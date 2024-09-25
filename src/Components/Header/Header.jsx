import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Date from '../../Components/date';  

const Header = () => {

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    window.location.href = '/login';
  }

  return (
    <header>
      <h1 onClick={() => {navigate('/')}}><strong>Geo</strong>Profs</h1>
      <div className="header-container">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/ziekmelden">Ziekmelden</a>
            </li>
<<<<<<< HEAD
            { localStorage.getItem('isLoggedIn') ? (
              <li className="logout-button" onClick={() => {handleLogout()}}>
                <a><FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen</a>
              </li>
            ) : (<div></div>)}
=======
            <Date/>
            <li className="logout-button" onClick={() => {handleLogout()}}>
              <a><FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen</a>
            </li>
>>>>>>> 72de5e2f108e021cc74d1754dbe50ac9aaaebb35
          </ul>
        </nav>
        { localStorage.getItem('isLoggedIn') ? (
          <div className="account-container">
            <strong>Logged in as</strong>
            <span>{localStorage.getItem('firstname')} {localStorage.getItem('lastname')}</span>
          </div>
        ) : (<div></div>)}
      </div>
    </header>
  );
};

export default Header;