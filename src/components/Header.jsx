import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-flex-container">
        <h2>NC GAMES</h2>
        <nav>
          <Link className="nav-link" to="/">
            Homepage
          </Link>
          <Link className="nav-link" to="/Reviews">
            Reviews
          </Link>
          <Link className="nav-link" to="/Users">
            Users
          </Link>
        </nav>
      </div>
      <div className="user-icon">
        <p>User:</p>
        <p>grumpy19</p>
      </div>
    </header>
  );
};

export default Header;
