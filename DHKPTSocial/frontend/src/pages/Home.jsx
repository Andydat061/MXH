import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomePage from './customer/HomePage'
import SearchPage from './customer/SearchPage'
import MessagePage from './customer/MessagesPage'
import NotificationPage from './customer/NotificationsPage'
import ProfilePage from './customer/ProfilePage'
import SettingPage from './customer/SettingPage';
import CreatePost from './customer/CreatePost';
import Cookies from 'js-cookie';
import LogoSvg from '../components/svgs/DHKPTSocial';
import { FaHome, FaSearch, FaFacebookMessenger, FaUserCircle, FaBell  } from "react-icons/fa";
import { IoIosAddCircle,IoIosSettings  } from "react-icons/io";
import { useSnackbar } from 'notistack';

const Home = () => {
  const [inCreate, setCreate] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleHome = () => {
    document.getElementById('home').style.display = 'block';
    document.getElementById('search').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
    setCreate(false);
  };
  const handleSearch = () => {
    document.getElementById('search').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
    setCreate(false);
  };
  const handleMessage = () => {
    document.getElementById('message').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
    setCreate(false);
  };
  const handleNotify = () => {
    document.getElementById('notification').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
    setCreate(false);
  };
  const handleProfile = () => {
    document.getElementById('profile').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('setting').style.display = 'none';
    setCreate(false);
  };
  const handleSetting = () => {
    document.getElementById('setting').style.display = 'block';
    document.getElementById('home').style.display = 'none';
    document.getElementById('search').style.display = 'none';
    document.getElementById('notification').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    setCreate(false);
  };
  const handleCreate = () =>{

    if(!inCreate){
      setCreate(true);
      document.getElementById('setting').style.display = 'none';
      document.getElementById('home').style.display = 'none';
      document.getElementById('search').style.display = 'none';
      document.getElementById('notification').style.display = 'none';
      document.getElementById('message').style.display = 'none';
      document.getElementById('profile').style.display = 'none';
    }
  }
  useEffect(() => {
    const id = Cookies.get('customerId');
    const name = Cookies.get('customerName');
    if(id === undefined && name === undefined) {
      navigate('/login'); 
      enqueueSnackbar('Hãy đăng nhập', { variant: 'error' })
    }
  })
  return (
    <div className='flex'>
      <div className='w-1/5 h-screen text-white fixed bg-black'>
        <ul className='relative h-full'>
        <li className='text-xl p-4 font-bold bg-black flex items-center '>
            <LogoSvg/>
          </li>
          <li onClick={handleHome} 
          className='text-lg p-4 font-bold bg-black hover:cursor-pointer  flex items-center 
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <FaHome className='text-white mr-6 ml-4 align-middle text-3xl'/>Home
          </li>
          <li onClick={handleSearch} className='text-lg p-4 font-bold bg-black hover:cursor-pointer flex items-center mt-2
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <FaSearch className='text-white mr-6 ml-4 align-middle text-3xl'/>Search
          </li>
          <li onClick={handleMessage} className='text-lg p-4 font-bold bg-black hover:cursor-pointer flex items-center mt-2
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <FaFacebookMessenger className='text-white mr-6 ml-4 align-middle text-3xl'/>Messages
          </li>
          <li onClick={handleNotify} className='text-lg p-4 font-bold bg-black hover:cursor-pointer flex items-center mt-2
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <FaBell className='text-white mr-6 ml-4 align-middle text-3xl'/>Notifications
          </li>
          <li onClick={handleProfile} className='text-lg p-4 font-bold bg-black hover:cursor-pointer flex items-center mt-2
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <FaUserCircle className='text-white mr-6 ml-4 align-middle text-3xl'/>Profile
          </li>
          <li onClick={handleCreate} className='text-lg p-4 font-bold bg-black hover:cursor-pointer flex items-center mt-2
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <IoIosAddCircle className='text-white mr-6 ml-4 align-middle text-3xl'/>Create Post
          </li>
          <li onClick={handleSetting} className='text-lg p-4 font-bold bg-black hover:cursor-pointer flex items-center absolute bottom-0 w-full
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 '>
            <IoIosSettings className='text-white mr-6 ml-4 align-middle text-3xl'/>Settings
          </li>
        </ul>
      </div>
      <div className='w-1/5'></div>
      <div className='w-3/5 block bg-gradient-to-r from-fuchsia-500 to-cyan-500' id='home' >
        <HomePage/>
      </div>
      <div className='w-3/5 hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white' id='search'>
        <SearchPage/>
      </div>
      <div className='w-3/5 hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white' id='message'>
        <MessagePage/>
      </div>
      <div className='w-3/5 hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white' id='notification'>
        <NotificationPage/>
      </div>
      <div className='w-3/5 hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white' id='profile'>
        <ProfilePage/>
      </div>
      <div className='w-3/5 hidden bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white' id='setting'>
        <SettingPage/>
      </div>
      {inCreate ? (
        <div className='w-3/5 bg-gradient-to-r from-fuchsia-500 to-cyan-500'>
          <CreatePost/>
        </div>
      ): (
        <div>
        </div>
      )}
      <div className='w-1/5'></div>
      <div className='w-1/5 h-screen fixed bg-black right-0'></div>
    </div>
  )
}

export default Home