import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AuthRegisterPage from './pages/AuthRegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import AuthResetPasswordPage from './pages/AuthResetPassword';
import ProfilePage from './pages/ProfilePage';
import ProfileChangePasswordPage from './pages/ProfileChangePasswordPage';

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
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/profile/change-password"
          element={<ProfileChangePasswordPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
