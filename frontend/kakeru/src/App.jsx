import './App.css';
import { Link } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <>
      <header>
        <h1>Kakeru</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/trends"> Trends</Link>
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
