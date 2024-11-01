import React, { useEffect, useState } from 'react'
import CardPost from '../../components/CardPost.jsx'
import Cookies from 'js-cookie';
import axios from 'axios';

const HomePage = () => {
  const[postIDs, setPostID] = useState([]);
  const[reload, setReload] = useState('');
  const fetchFollow = async (userID) => {
    try{
      const responseFollow = await axios.get(`http://localhost:1324/follows/${userID}`);
      const followers = responseFollow;
      let postListID = [];
      for(let i = 0; i < followers.data.count; i++){
        const responseArticle = await axios.get(`http://localhost:1324/articles/${followers.data.data[i].followingID}`);
        for(let i = 0; i < responseArticle.data.count; i++)
        {
          postListID.push(responseArticle.data.data[i]);
        }
      }
      setPostID(shuffleArray(postListID));
    }
    catch(error){
      console.log(error);
    }
  }
  
  useEffect(() => {
    const id = Cookies.get('customerId');
    fetchFollow(id);
  }, [])
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Tạo số ngẫu nhiên từ 0 đến i
      const j = Math.floor(Math.random() * (i + 1));
      // Hoán đổi phần tử thứ i và j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  return (
    <div className='flex w-full'>
      <div className='flex-[4_4_0] mr-auto border-r border-gray-700 min-h-screen w-full'>
        {postIDs.map((post) => (
          <div key={post._id} className='mt-2'>
            <CardPost postID={post._id} author={post.userID} description={post.description} post={post}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage