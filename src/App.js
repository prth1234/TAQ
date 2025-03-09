import './assets/css/App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';
import { ChakraProvider } from '@chakra-ui/react';
import initialTheme from './theme/theme';
import { useState } from 'react';

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState(initialTheme);

  return (
    <ChakraProvider theme={currentTheme}>
      <Routes>
        {/* Default route now redirects to the sign-in page */}
        <Route path="/" element={<Navigate to="/auth/sign-in" replace />} />

        {/* Authentication layout (includes Sign In and Sign Up pages) */}
        <Route path="auth/*" element={<AuthLayout />} />

        {/* Admin layout (only accessible after login) */}
        <Route
          path="admin/*"
          element={
            <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />

        {/* RTL layout */}
        <Route
          path="rtl/*"
          element={
            <RTLLayout theme={currentTheme} setTheme={setCurrentTheme} />
          }
        />
      </Routes>
    </ChakraProvider>
  );
}