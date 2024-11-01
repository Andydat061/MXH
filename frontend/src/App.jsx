import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Routes, Route, useLocation} from 'react-router-dom'
import React from 'react'
import Home from './pages/Home';
import Register from './pages/Register';
import ShowUser from './pages/ShowUser';
import UpdateUser from './pages/UpdateUser';
import DeleteUser from './pages/DeleteUser';
import ListUser from './pages/ListUser';
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import HomePage from './pages/customer/HomePage'

const App = () => {
  return (
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users/list' element={<ListUser/>}/>
        <Route path='/users/details/:id' element={<ShowUser/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/users/edit/:id' element={<UpdateUser/>}/>
        <Route path='/users/delete/:id' element={<DeleteUser/>}/>
        <Route path='/notifications' element={<DeleteUser/>}/>
        <Route path='/messages' element={<DeleteUser/>}/>
        <Route path='/search' element={<DeleteUser/>}/>
        <Route path='/setting' element={<DeleteUser/>}/>
      </Routes>
  )
}

export default App
