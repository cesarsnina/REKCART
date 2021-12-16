import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllWorkoutsPage from './components/AllWorkoutsPage';
import Login from './components/Login';
import SingleWorkoutsPage from './components/SingleWorkoutsPage2';
import Signup from './components/Signup';
import UserPage from './components/UserPage';
import {UserContext, FilterQueryContext} from './components/UserContext.js'

import './App.css';

const App = () => {
  const [globalUser, setGlobalUser] = useState(null)
  const [globalFilterQuery, setGlobalFilterQuery] = useState('')
  return (
    <>
    <UserContext.Provider value ={{globalUser, setGlobalUser}}>
    <FilterQueryContext.Provider value = {{globalFilterQuery, setGlobalFilterQuery}}>
      {!globalUser ? (
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      ) : (
        <Routes>
            <Route path='/' element={<UserPage />} />
            <Route path='/users/:id/workouts' element={<AllWorkoutsPage />} />
            <Route path='/users/:id/workouts/:wid' element={<SingleWorkoutsPage />} />
        </Routes>
      )}
      </FilterQueryContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;