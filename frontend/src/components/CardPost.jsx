import React, { useEffect, useState } from 'react'
import Heart from '../assets/heart.png'
import Heart_Love from '../assets/heart-red.png'
import { FaRegComment, FaRegHeart, FaRegPaperPlane, FaAngleRight, FaAngleLeft, FaHeart  } from "react-icons/fa";
import axios from 'axios'
import { Link } from "react-router-dom";
import { useSnackbar } from 'notistack';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  HStack,
  Box,
  Input,
  Avatar,
  Flex,
  Text
} from '@chakra-ui/react'
import Cookies from 'js-cookie';
function CardPost(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [imageSrc, setImage] = useState(Heart);
    const [avatar, setAvatar] = useState('');
    const [author, setAuthor] = useState('');
    const [username, setUsername] = useState('');
    const [files, setFile] = useState([]);
    const [comment, setComment] = useState('');
    const [postLikes, setPostLikes] = useState(1000);
    const [postComments, setPostComments] = useState(100);
    const [descriptionPost, setDescription] = useState('');
    const [fileLength, setFileLength] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [postID, setPostID] = useState('');
    const [post,setPost] = useState('');
    const [like, setLike] = useState();
    const [likeID, setLikeID] = useState('');
  const fetchVideos = async (postID) => {
    try {
      const response = await axios.get(`http://localhost:1324/files/${postID}`);
      setFile(response.data);
      setFileLength(response.data.length);
      // console.log(response.data.length);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  const fetchUser = async (userID) => {
    try {
      const response = await axios.get(`http://localhost:1324/users/${userID}`);
      setAuthor(response.data.name);
      setUsername(response.data.username);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  const fetchLike = async (user, postID) => {
    try{
      const response = await axios.get(`http://localhost:1324/likes/${user}/${postID}`);
      
      if(response.data != null){
        // console.log('Người dùng đã like bài post' + postID);
        setLike(true);
        setLikeID(response.data._id);
      }
      else{
        // console.log('Người dùng chưa like bài post' + postID);
        setLike(false);
      }
    }
    catch{
      console.log('Like not found');
    }
  }
  const handleLike = () => {
    const likes = {
      articleID: postID,
      userID: Cookies.get('customerId')
    }
    axios.post('http://localhost:1324/likes', likes)
    const articlePost = {numberOfLike: post.numberOfLike + 1};
    axios.put(`http://localhost:1324/articles/${postID}`, articlePost)
    .then(() => {
      fetchPost();
      fetchLike(Cookies.get('customerId'), props.postID);
    });
  }
  const handleDislike = () => {
    axios.delete(`http://localhost:1324/likes/${likeID}`);
    const articlePost = {numberOfLike: post.numberOfLike - 1};
    axios.put(`http://localhost:1324/articles/${postID}`, articlePost)
    .then(() => {
      fetchPost();
      fetchLike(Cookies.get('customerId'), props.postID);
    });
    
  }
  const fetchPost = async () => {
    const response = await axios.get(`http://localhost:1324/articles/all/${postID}`);
    setPost(response.data);
  }
  const handleComment = (e) => {
    e.preventDefault();
    // enqueueSnackbar('Comment: ' + comment, { variant: 'success' });
    // console.log(Cookies.get('customerId'));
    // console.log(postID);
    if(comment === ''){
      enqueueSnackbar('Chưa nhập bình luận', { variant: 'warning' });
    }
    else{
      const dataComment = {
        articleID: postID,
        userID: Cookies.get('customerId'),
        commentDetail: comment,
      }
      axios.post(`http://localhost:1324/comments`, dataComment)
      .then((response) => {
        console.log(response.data);
        enqueueSnackbar('Bình luận thành công', { variant: 'success' });
        setComment('');
        const articlePost = {numberOfComment: post.numberOfComment + 1};
        axios.put(`http://localhost:1324/articles/${postID}`, articlePost)
        .then(() => {
          fetchPost();
        });
      })
      .catch((e) => {
        console.log(e);
      })
    }
  }
  const handleTurnRight = () => {
    if(scrollPosition == fileLength - 1){
      console.log(scrollPosition);
      document.getElementById(`${postID}`).style.transform = 'translateX(0)';
      setScrollPosition(0);
    }
    else{
      console.log(scrollPosition);
      const updatePossition = scrollPosition + 1;
      document.getElementById(`${postID}`).style.transform = `translateX(${updatePossition*(-448)}px)`;
      setScrollPosition(updatePossition);
    }
  }
  const handleTurnLeft = () => {
    if(scrollPosition == 0){
      document.getElementById(`${postID}`).style.transform = `translateX(${(fileLength - 1)*(-448)}px)`;
      setScrollPosition(fileLength - 1);
    }
    else{
      const updatePossition = scrollPosition - 1;
      document.getElementById(`${postID}`).style.transform = `translateX(${updatePossition*-448}px)`;
      setScrollPosition(updatePossition);
    }
  }
  useEffect(() => {
    fetchVideos(props.postID);
    fetchUser(props.author);
    setDescription(props.description);
    setPostID(props.postID);
    setPost(props.post);
    fetchLike(Cookies.get('customerId'), props.postID);
  }, [])
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="6xl" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent p="0">
          <ModalHeader p='2'>
            <Flex>
              <Box className='w-1/2' textAlign='center'>
                Post
              </Box>
              <Box className='w-1/2'textAlign='center'>
                Comments
              </Box>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="0">
            <HStack gap="0">
              <Box h="440px" w="50%">
                Image
              </Box>
              <Box h="440px" w="50%" overflow='scroll' className='bg-gradient-to-r from-fuchsia-500 to-cyan-500' p='4'
              sx={{
                '&::-webkit-scrollbar': { display: 'none' },
                '-ms-overflow-style': 'none', // for Internet Explorer
                'scrollbar-width': 'none', // for Firefox
              }}>
                <Box className='bg-white' borderRadius="md" p="2" w="max-content" m="2">
                  new comment
                </Box>
                <Box className='bg-white' borderRadius="md" p="2" w="max-content" m="2">
                  new comment
                </Box>
              </Box>
              
            </HStack>
          </ModalBody>
            
          <ModalFooter display='flex' p="0">
            <Flex className='w-1/2 p-2' h='100%' alignItems='center' pl="30px" pr="30px" pt="10px" pb="10px">
              <Avatar size='md'/>
              <Text className='text-black' ml="20px">Name</Text>
            </Flex>
            <form onSubmit={handleComment} className='flex items-center w-1/2'>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Cập nhật giá trị bình luận
                className="w-full bg-gray-800 text-white p-2 rounded-lg mb-0"
                placeholder="Add a comment..."
              />
              <button type="submit" className='bg-transparent btn-sm text-black px-4 font-bold'>
                Reply
              </button>
            </form>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {fileLength == 0 ? (
        <div className="bg-black text-white rounded-lg max-w-md mx-auto shadow-2xl">
        {/* Header của post */}
        <div className="flex items-center p-4">
          <img
            src="https://i.ytimg.com/vi/skluj-DE5xI/maxresdefault.jpg"
            alt={author}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <h4 className="font-bold">{author}</h4>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
          <div className="ml-auto">
            <button className="text-white">•••</button>
          </div>
        </div>
        {/* Nội dung bài post */}
        <div className="px-4 pb-4">
          <p>
            <span className="font-bold">{author} </span>
            {descriptionPost}
          </p>
        </div>
        {/* Các biểu tượng tương tác */}
        <div className="flex justify-between px-4 py-2">
          <div className="flex space-x-4">
            {like ? (<FaHeart className="w-6 h-6 cursor-pointer text-red-500" onClick={handleDislike}/>):(<FaRegHeart className="w-6 h-6 cursor-pointer hover:text-red-500" onClick={handleLike}/>)}
            <FaRegComment className="w-6 h-6 cursor-pointer hover:text-blue-500" onClick={onOpen}/>
            <FaRegPaperPlane className="w-6 h-6 cursor-pointer hover:text-green-500" />
          </div>
        </div>
        {/* Số lượt thích */}
        <div className="px-4 pb-2">
          <p className="font-bold">{post.numberOfLike} likes</p>
          <Link to="#" className="text-gray-500 text-sm">
            View all {post.numberOfComment} comments
          </Link>
        </div>
        {/* Form nhập comment */}
        <div className="px-4 pb-4">
          <form onSubmit={handleComment} className='flex items-center'>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)} // Cập nhật giá trị bình luận
              className="w-full bg-gray-800 text-white p-2 rounded-lg mb-0"
              placeholder="Add a comment..."
            />
            <button type="submit" className='btn-sm text-white px-4 bg-transparent font-bold'>
              Reply
            </button>
          </form>
        </div>
      </div>
      ) : (
      <div className="bg-black text-white rounded-lg max-w-md mx-auto shadow-2xl">
        {/* Header của post */}
        <div className="flex items-center p-4">
          <img
            src="https://i.ytimg.com/vi/skluj-DE5xI/maxresdefault.jpg"
            alt={author}
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-4">
            <h4 className="font-bold">{author}</h4>
            <p className="text-sm text-gray-500">@{username}</p>
          </div>
          <div className="ml-auto">
            <button className="text-white">•••</button>
          </div>
        </div>

        {/* Phần ảnh */}
        <div className="relative" style={{overflow: 'hidden'}} >
          <div className='w-full flex transition duration-500 ease-in-out' id={postID}>
            {files.map((file) => (
                  file.filename.includes(".mp4") ? (
                      <video className='w-full object-cover' controls key={file._id} >
                          <source src={`http://localhost:1324/files/download/${file._id}`} type="video/mp4" />
                      </video>
                  ) : (
                      <img className='w-full object-cover' src={`http://localhost:1324/files/download/${file._id}` } key={file._id}/>
                  )
              ))}
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center space-x-2 pb-2">
            {fileLength != 0 ? (
              files.map((fileCircle, index) => (
                index == scrollPosition ? (
                  <div className="w-2 h-2 rounded-full bg-white" key={fileCircle._id}></div>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-gray-500" key={fileCircle._id}></div>
                )
              ))
            ) : (
              <div className="hidden"></div>
            )}
          </div>
          <div className="absolute inset-y-0 right-0 flex justify-center space-x-2 items-center mr-2">
            <div className="w-6 h-6 rounded-full bg-white bg-opacity-75 flex justify-center items-center hover:ring-2 hover:ring-black" onClick={handleTurnRight} >
              <FaAngleRight className='text-black text-opacity-75 cursor-pointer'/>
            </div>
          </div>
          <div className="absolute inset-y-0 flex justify-center space-x-4 items-center ml-2">
            <div className="w-6 h-6 rounded-full bg-white bg-opacity-75 flex justify-center items-center hover:ring-2 hover:ring-black" onClick={handleTurnLeft}>
              <FaAngleLeft className='text-black text-opacity-75 cursor-pointer'/>
            </div>
          </div>
        </div>

        {/* Các biểu tượng tương tác */}
        <div className="flex justify-between px-4 py-2">
          <div className="flex space-x-4">
          {like ? (<FaHeart className="w-6 h-6 cursor-pointer text-red-500" onClick={handleDislike}/>):(<FaRegHeart className="w-6 h-6 cursor-pointer hover:text-red-500" onClick={handleLike}/>)}
            <FaRegComment className="w-6 h-6 cursor-pointer hover:text-blue-500" onClick={onOpen}/>
            <FaRegPaperPlane className="w-6 h-6 cursor-pointer hover:text-green-500" />
          </div>
        </div>

        {/* Số lượt thích */}
        <div className="px-4 pb-2">
          <p className="font-bold">{post.numberOfLike} likes</p>
        </div>

        {/* Nội dung bài post */}
        <div className="px-4 pb-4">
          <p>
            <span className="font-bold">{author} </span>
            {descriptionPost}
          </p>
          <Link to="#" className="text-gray-500 text-sm">
            View all {post.numberOfComment} comments
          </Link>
        </div>

        {/* Form nhập comment */}
        <div className="px-4 pb-4">
          <form onSubmit={handleComment} className='flex items-center'>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)} // Cập nhật giá trị bình luận
                className="w-full bg-gray-800 text-white p-2 rounded-lg mb-0"
                placeholder="Add a comment..."
              />
              <button type="submit" className='bg-transparent text-white pl-4 font-bold'>
                Reply
              </button>
            </form>
        </div>
      </div>
      )}
      

      {/* <div className='w-1/2 h-auto bg-white m-auto '>
        <div className='w-full h-auto bg-blue-400 flex'>
        <div className='m-2 h-10 w-10'>
            <img src="https://i.ytimg.com/vi/skluj-DE5xI/maxresdefault.jpg" alt="" className='w-full h-full rounded-full'/>
        </div>
        <div className='flex items-center ml-4'>
            <p>{author}</p>
        </div>
        </div>
        <div className='w-full h-80 bg-black' style={{overflow: 'hidden'}}>
        <div className='flex w-full h-auto items-center transition duration-500 ease-in-out' id='scroll-view'>
            {files.map((file) => (
                file.filename.includes(".mp4") ? (
                    <video className='w-full' autoPlay key={file._id} muted>
                        <source src={`http://localhost:1324/files/download/${file._id}`} type="video/mp4" />
                    </video>
                ) : (
                    <img className='w-full' src={`http://localhost:1324/files/download/${file._id}` } key={file._id}/>
                )
            ))}
            
        </div>
        <div className='flex justify-center w-full'>
            <div className='rounded-full bg-red-400 p-2 mr-4'>Qua phải</div> 
            <div className='rounded-full bg-blue-400 p-2'>Qua trái</div>
        </div>
        </div >
        <div className='w-full h-auto flex items-center mt-2'>
        <img src={imageSrc} width={30} height={30} onClick={handleImage} className='mr-2 ml-2'/>
        <img src={Comment} width={30} height={30}/>
        </div>
        <div className='w-full h-auto flex items-center'>
        <p className='w-full h-auto block p-2'>uilarsgfuiogpfirqefgepgpqieqegpqergpeguiqpuiàafsfasfgpquyofouyfofr</p>
        </div>
        <div className='w-full h-auto flex items-center'>
        <input type="text" className='w-full border-none focus:ring-0 ' placeholder='Add your comment...'/>
        </div>
    </div> */}
    </>
  )
}

export default CardPost