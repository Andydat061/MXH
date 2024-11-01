import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spiner';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import LogoSvg from '../components/svgs/DHKPTSocial';
const Login = () => {
    const [user, setUser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    
    useEffect(() => {
      const id = Cookies.get('customerId');
      const name = Cookies.get('customerName');
      console.log(id != undefined);
      console.log(name != undefined);
      if(id != undefined || name != undefined) {
        navigate('/home'); 
      }
    })
    const handleLogin = () => {
        axios
        .get(`http://localhost:1324/users/username/${username}`)
        .then((response) => {
            setUser(response.data);
            setLoading(false);
            if(password === ''){
              enqueueSnackbar('Chưa nhập đầy đủ thông tin', { variant: 'error' });
            }
            else if(password !== response.data.password){
              enqueueSnackbar('Sai mật khẩu', { variant: 'error' });
            }
            else{
              enqueueSnackbar('Đăng nhập thành công', { variant: 'success' });
              Cookies.set('customerId', response.data._id, { expires: 1 });
              Cookies.set('customerName', response.data.name, { expires: 1 });
              
              navigate('/home'); 
            }
        })
        .catch((error) => {
            enqueueSnackbar('Người dùng không tồn tại', { variant: 'error' });
        });
    }
  return (
    // <div className='max-w-screen mx-auto flex h-screen '>
		// 	<div className='flex-1 hidden lg:flex items-center justify-center bg-gradient-to-r  from-violet-400 to-violet-600'>
		// 		<LogoSvg className='lg:w-2/3 fill-white' />
		// 	</div>
		// 	<div className='flex-1 flex flex-col justify-center items-center bg-gradient-to-l  from-violet-400 to-violet-600'>
		// 		<form className='flex gap-4 flex-col w-2/5'>
		// 			<h1 className='text-4xl font-extrabold text-white mb-4'>{"Let's"} go.</h1>
		// 			<label className='input input-bordered rounded flex items-center gap-2 bg-white p-2'>
		// 				<MdOutlineMail/>
		// 				<input
		// 					type='text'
		// 					className='grow hover:outline-none focus:outline-none'
		// 					placeholder='Username'
		// 					name='username'
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
		// 				/>
		// 			</label>

		// 			<label className='input input-bordered rounded flex items-center gap-2 bg-white p-2'>
		// 				<MdPassword />
		// 				<input
		// 					type='password'
		// 					className='grow hover:outline-none focus:outline-none'
		// 					placeholder='Password'
		// 					name='password'
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
		// 				/>
		// 			</label>
		// 			<button className='btn rounded-full text-white bg-black p-2' onClick={handleLogin}>Login</button>
		// 		</form>
		// 		<div className='flex flex-col gap-2 mt-4'>
		// 			<p className='text-white text-lg'>{"Don't"} have an account?</p>
		// 			<Link to='/register'>
		// 				<button className='btn rounded-full btn-primary text-white btn-outline w-full bg-black p-2'>Sign up</button>
		// 			</Link>
		// 		</div>
		// 	</div>
		// </div>

    <div className='flex h-screen bg-gradient-to-r from-fuchsia-500 to-cyan-500'>
      <div className='w-1/2 flex justify-center items-center '>
      <LogoSvg className='lg:w-2/3 fill-black' />
      </div>
      <div className='w-1/2 h-auto self-center'>
        <h1 className='text-3xl my-4 text-center text-white font-bold'>Đăng nhập</h1>
        {loading ? <Spinner /> : ''}
        <div className='flex flex-col border-2 bg-white rounded-xl w-[600px] p-4 mx-auto shadow-2xl'>
          <div className='my-4'>
            <label className='text-xl mr-4 text-violet-600'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Tên đăng nhập...'
              className='border-2 border-gray-500 px-4 py-2 w-full rounded-md hover:outline-violet-600 focus:outline-violet-600'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-violet-600'>Password</label>
            <input
              type='password'
              value={password}
              placeholder='Mật khẩu...'
              onChange={(e) => setPassword(e.target.value)}
              className='border-2 border-gray-500 px-4 py-2 rounded-md w-full hover:outline-violet-600 focus:outline-violet-600'
            />
          </div>
          <button className='p-2 bg-sky-300 m-8 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold rounded-md' onClick={handleLogin}>
            Đăng nhập
          </button>
          <p className='text-black text-lg align-center text-center'>Chưa có tài khoản?</p>
          <Link to={`/register`} className='flex justify-center'>
              <button className='rounded-md bg-teal-300 p-2 m-2 bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-bold rounded-md'>Đăng ký</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login