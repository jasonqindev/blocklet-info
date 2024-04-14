import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserProvider } from './context/user-context';

import Home from './pages/home';
import './styles/app.css';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  const basename = window?.blocklet?.prefix || '/';
  return (
    <UserProvider>
      <Router basename={basename}>
        <App />
      </Router>
    </UserProvider>
  );
}
