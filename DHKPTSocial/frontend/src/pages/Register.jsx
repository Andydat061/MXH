import React, { useState, useRef } from 'react';
import Spinner from '../components/Spiner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import LogoSvg from '../components/svgs/DHKPTSocial';
import { FaUserAlt  } from "react-icons/fa";

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const imgRef = useRef(null);

  const handleRegister = () => {
    if(email === ''){
      enqueueSnackbar('Nhập email', {variant: 'warning'});
    }
    else if(!(password === repassword)){
      enqueueSnackbar('Mật khẩu nhập lại không trùng khớp', { variant: 'error' });
    }
    else{
      const data = {
        username,
        password,
        name,
        dob,
        email,
        description
      };
      setLoading(true);
      axios
        .post('http://localhost:1324/users', data)
        .then(() => {
          setLoading(false);
          enqueueSnackbar('Sign up successfully', { variant: 'success' });
          navigate('/login');
        })
        .catch((error) => {
          setLoading(false);
          // alert('An error happened. Please Chack console');
          enqueueSnackbar('Error', { variant: 'error' });
          console.log(error);
        });
    }
  };
  return (
    <>
    <div className='flex bg-gradient-to-r from-fuchsia-500 to-cyan-500' >
      <div className='w-1/2 flex justify-center items-center fixed h-screen'>
        <LogoSvg className='lg:w-2/3 fill-black' />
      </div>
      <div className='w-1/2 flex justify-center items-center'>
      </div>
      <div className='p-4 w-1/2'>
        <h1 className='text-3xl my-4 text-center text-white font-bold'>Đăng ký</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 rounded-xl w-[600px] p-4 mx-auto bg-white shadow-2xl'>
          <div className='my-4 flex justify-center items-center'>
            <div className='rounded-full h-32 w-32 bg-gradient-to-r from-fuchsia-500 to-cyan-500 flex justify-center items-center shadow-lg
            hover:cursor-pointer' onClick={() => imgRef.current.click()}>
              <FaUserAlt className='text-5xl text-white'/>
            </div>
            <input className='hidden' type="file" ref={imgRef} accept="image/*"/>
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Name</label>
            <input
              type='text'
              value={name}
              placeholder='Nhập họ tên...'
              onChange={(e) => setName(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full hover:outline-violet-600 focus:outline-violet-600 rounded-md mt-2'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Date of birth</label>
            <input
              type='datetime-local'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full hover:outline-violet-600 focus:outline-violet-600 rounded-md mt-2'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Email</label>
            <input
              type='text'
              value={email}
              placeholder='Nhập gmail...'
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full hover:outline-violet-600 focus:outline-violet-600 rounded-md mt-2'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Username</label>
            <input
              type='text'
              value={username}
              placeholder='Nhập tên đăng nhập...'
              onChange={(e) => setUsername(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 w-full hover:outline-violet-600 focus:outline-violet-600 rounded-md mt-2' 
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Password</label>
            <input
              type='password'
              value={password}
              placeholder='Nhập mật khẩu'
              onChange={(e) => setPassword(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full hover:outline-violet-600 focus:outline-violet-600 rounded-md mt-2'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Confirm password</label>
            <input
              type='password'
              value={repassword}
              placeholder='Nhập lại mật khẩu...'
              onChange={(e) => setRepassword(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2  w-full hover:outline-violet-600 focus:outline-violet-600 rounded-md mt-2'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold rounded-md' onClick={handleRegister}>
            Đăng ký
          </button>
          <p className='text-black text-lg align-center text-center'>Đã có tài khoản?</p>
          <Link to={`/login`} className='flex justify-center'>
              <button className='rounded-md bg-teal-300 p-2 m-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold rounded-md'>Đăng nhập</button>
          </Link>
        </div>
      </div>
    </div>
    


    {/* <div className='max-w-screen-xl mx-auto flex h-screen px-10'>
      <div className='flex-1 hidden lg:flex items-center justify-center'>
        <LogoSvg className=' lg:w-2/3 fill-white' />
      </div>
      <div className='flex-1 flex flex-col justify-center items-center'>
        <form className='lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col'>
          <h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdOutlineMail />
            <input
              type='email'
              className='grow p-2'
              placeholder='Email'
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className='flex gap-4 flex-wrap'>
            <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
              <FaUser />
              <input
                type='text'
                className='grow p-2'
                placeholder='Username'
                name='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className='input input-bordered rounded flex items-center gap-2 flex-1'>
              <MdDriveFileRenameOutline />
              <input
                type='text'
                className='grow p-2'
                placeholder='Full Name'
                name='fullName'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdPassword />
            <input
              type='password'
              className='grow p-2'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <MdPassword />
            <input
              type='password'
              className='grow p-2'
              placeholder='Confirm password'
              name='re-password'
              value={repassword}
              onChange={(e) => setRepassword(e.target.value)}
            />
          </label>
          <label className='input input-bordered rounded flex items-center gap-2'>
            <input
              type='datetime-local'
              className='grow p-2'
              name='dob'
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </label>
          <button className='btn rounded-full btn-primary text-white' onClick={handleRegister}>Sign up</button>
        </form>
        <div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
          <p className='text-white text-lg'>Already have an account?</p>
          <Link to='/login'>
            <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign in</button>
          </Link>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default Register