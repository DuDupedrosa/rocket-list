import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthResetPasswordPage from './pages/AuthResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/register" element={<AuthRegisterPage />} />
        <Route
          path="/auth/reset-password"
          element={<AuthResetPasswordPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
