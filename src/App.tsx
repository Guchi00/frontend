import React from 'react';
import { Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import { Home, Business, Customer, User } from './pages';
import './App.css';
import { Header } from './components';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/users' element={<User />}/>
        <Route path='/customers' element={<Customer />}/>
        <Route path='/businesses' element={<Business />}/>
      </Routes>
    </div>
  );
}

export default App;
