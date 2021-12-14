import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AllWorkoutsPage from './components/AllWorkoutsPage';
import Filter from './components/Filter';
import Login from './components/Login';
import SingleWorkoutsPage from './components/SingleWorkoutsPage';
import Signup from './components/Signup';
import UserPanel from './components/UserPanel';
import Workout from './components/Workout';
import WorkoutForm from './components/WorkoutForm';
import UserPage from './components/UserPage';


import './App.css';

const Header = () => {
  return (
    <ul>
      <Link to='/allworkpage'><li>AllWorkoutsPage</li></Link>
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
  return (
    <>
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
    </>
  );
}

export default App;
