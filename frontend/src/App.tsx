import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Home from './Components/Home/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import Signin from './Components/Signin/Signin';
import Header from './Components/Header/Header';
import Signup from './Components/Signup/Signup';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <div>
      <Header />
      <main className='p-4'>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <Signin />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/home" /> : <Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
