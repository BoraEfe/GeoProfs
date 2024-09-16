import './Header.css';

const Header = () => {
  return (
    <header>
      <h1>GeoProfs</h1>
      <div className="header-container">
        <nav>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
          </ul>
        </nav>
        <div className="account-container">
          <strong>Logged in as</strong>
          <span>naam</span>
        </div>
      </div>
    </header>
  );
};

export default Header;