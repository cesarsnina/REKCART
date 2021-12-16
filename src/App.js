import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AllWorkoutsPage from './components/AllWorkoutsPage2';
import Filter from './components/Filter';
import Login from './components/Login';
import SingleWorkoutsPage from './components/SingleWorkoutsPage2';
import Signup from './components/Signup';
import UserPanel from './components/UserPanel';
import Workout from './components/Workout';
import WorkoutForm from './components/WorkoutForm';
import UserPage from './components/UserPage';
import {UserContext, FilterQueryContext} from './components/UserContext.js'


import './App.css';

const Header = () => {
  return (
    <ul>
      <Link to='/'><li>UserPage</li></Link>
      <Link to='/users/:id/workouts'><li>AllWorkoutsPage</li></Link>
      <Link to='/filter'><li>Filter</li></Link>
      <Link to='/login'><li>Login</li></Link>
      <Link to='/singleworkpage'><li>SingleWorkoutsPage</li></Link>
      <Link to='/signup'><li>Signup</li></Link>
      <Link to='/userpage'><li>UserPage</li></Link>
      <Link to='/userpanel'><li>UserPanel</li></Link>
      <Link to='/workout'><li>Workout</li></Link>
      <Link to='/workForm'><li>WorkoutForm</li></Link>
    </ul>
);

}

const App = () => {
  const [globalUser, setGlobalUser] = useState('state from app')
  const [globalFilterQuery, setGlobalFilterQuery] = useState('')
  return (
    <>
    <UserContext.Provider value ={{globalUser, setGlobalUser}}>
    <FilterQueryContext.Provider value = {{globalFilterQuery, setGlobalFilterQuery}}>
      <Header />
      <Routes>
          <Route path='/' element={<UserPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/filter' element={<Filter />} />
          <Route path='/userpage' element={<UserPage />} />
          <Route path='/userpanel' element={<UserPanel />} />
          <Route path='/workForm' element={<WorkoutForm />} />
          <Route path='/users/:id/workouts' element={<AllWorkoutsPage />} />
          <Route path='/users/:id/workouts/:wid' element={<SingleWorkoutsPage />} />
          <Route path='/workout/:wid' element={<Workout />} />
      </Routes>
      </FilterQueryContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
