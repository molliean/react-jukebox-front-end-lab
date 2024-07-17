// src/App.jsx
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar/NavBar';
import Landing from './components/Landing/Landing';
import SignupForm from './components/SignupForm/SignupForm';
import SigninForm from './components/SigninForm/SigninForm'
import * as authService from '../src/services/authService';

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }
  return (
    <>
      <NavBar user={user} handleSignout={handleSignout}/>
      <Routes>
        {user ? (
          <Route path="/" element={<Home user={user} />} />
        ) : (
          <Route path="/" element={<Landing />} />
        )}
        <Route path='/signup' element={<SignupForm setUser={setUser} />} />
        <Route path='/signin' element={<SigninForm setUser={setUser} />} />
      </Routes>
    </>
  )
};

export default App;
