import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import ProtectedRoute from './Components/ProtectedRoute';
import Signin from './Components/Signin/Signin';
import Header from './Components/Header/Header';
import Signup from './Components/Signup/Signup';
import 'react-toastify/dist/ReactToastify.css'; 

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <main className='p-4'>
        <Routes>
          <Route path='/login' element={<Signin />} />
          <Route path='/register' element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
