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
    window.location.href = '/login';
  }

  return (
    <header className="w-screen h-20 bg-[#790924] flex flex-row items-center text-white px-4 overflow-x-hidden">
      <h1 
        onClick={() => {navigate('/')}}
        className="cursor-pointer min-w-[10vw]"
      >
        <strong className="font-medium">Geo</strong>Profs
      </h1>
      
      <div className="flex w-full h-full">
        {sessionStorage.getItem('uuid') ? (
          <>
            <nav className="w-full flex items-center justify-end">
              <ul className="flex list-none w-[calc(100%-100px)] gap-3 relative">
                <li className="font-roboto text-base">
                  <a 
                    onClick={() => {navigate('/')}}
                    className="text-white mx-2 cursor-pointer no-underline"
                  >
                    Home
                  </a>
                </li>
                <li className="font-roboto text-base">
                  <CheckForAccesToLeavePage />
                </li>
                <li className="font-roboto text-base">
                  <CheckForAccesToAddUser />
                </li>
                <div className="my-auto">
                  <Date />
                </div>
                <li 
                  className="cursor-pointer absolute right-8 font-roboto text-base"
                  onClick={handleLogout}
                >
                  <a className="text-white mx-2 cursor-pointer no-underline">
                    <FontAwesomeIcon icon={faArrowRightFromBracket} /> Uitloggen
                  </a>
                </li>
              </ul>
            </nav>
            <div className="pr-4 flex flex-col items-end justify-center w-48 mr-4">
              <strong className="font-bold">Logged in as</strong>
              <span>{sessionStorage.getItem('firstname')} {sessionStorage.getItem('lastname')},</span>
              <p><CheckUserRole /></p>
            </div>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
};

export default Header;