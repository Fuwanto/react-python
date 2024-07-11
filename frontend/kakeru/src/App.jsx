import './App.css';
import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { useAuth } from './provider/AuthContext';
import logo from './assets/logos/logo.svg';

function App() {
  const { user } = useAuth();

  return (
    <>
      <header>
        <nav>
          <img src={logo} alt="Kakeru Logo" className="logo" />
          <Link to="/">Home</Link>
          <Link to="/trends"> Trends</Link>
          {user ? (
            <>
              <Link to={`/me`}>View Profile</Link>
              <Link to="/logout">Logout</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )
          }
        </nav>
      </header>

      <AppRoutes />


      <footer>
        <p>&copy; 2024 Kakeru</p>
      </footer>
    </>
  );
}

export default App;
