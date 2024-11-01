import React, { useEffect, useState, useRef } from 'react'
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import axios from 'axios';

const CreatePost = () => {
    const [descriptionPost, setDescription] = useState('')
    const [file, setFile] = useState(null);
    const [user, setUser] = useState('');
    const [listMedia, setListMedia] = useState([]);
    const { enqueueSnackbar } = useSnackbar();
    const imgRef = useRef(null);
    useEffect(() => {
        const id = Cookies.get('customerId');
        const name = Cookies.get('customerName');
        setUser(id);
    })
    const handleFileChange = (e) => {
        setFile(e.target.files);
        const fileArray = e.target.files;

        const imageArray = [];
        const videoArray = [];

        const readFileAsDataURL = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject(new Error('File reading has failed'));
                reader.readAsDataURL(file);
            });
        };

        const loadMedia = async () => {
            const mediaPromises = [];

            for (let i = 0; i < fileArray.length; i++) {
                if (fileArray[i]) {
                    const mediaType = fileArray[i].type.startsWith('image/') ? 'image' : 'video';
                    mediaPromises.push(
                        readFileAsDataURL(fileArray[i]).then((dataURL) => ({
                            type: mediaType,
                            url: dataURL,
                        }))
                    );
                }
            }

            const media = await Promise.all(mediaPromises); // Đợi tất cả media (ảnh/video) được đọc xong
            setListMedia(media); // Lưu media vào state
        };

        loadMedia();
    };
    const handleDescription = (e) => {
        setDescription(e.target.value);
    };
    const handleUpload = async () => {
        if(descriptionPost === ''){
            enqueueSnackbar('Nhập mô tả bài đăng', { variant: 'error' });
          }
          else if (!file){
            enqueueSnackbar('Thêm hình ảnh hoặc video', { variant: 'error' });
          }
          else{
            const data = {
              descriptionPost,
              user
            };
            try{
                const response = await axios.post('http://localhost:1324/articles', data)
                setDescription('');
                console.log('Inserted document ID:', response.data._id);
                for (let i = 0; i < file.length; i++) {
                    if(i == file.length - 1){
                        const formData = new FormData();
                        formData.append('file', file[i]);
                        formData.append('postId', response.data._id); 
                        try {
                            const response = await axios.post('http://localhost:1324/files/upload', formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                            });
                            console.log('Last file uploaded successfully:', response.data);
                            enqueueSnackbar('Đăng tin thành công', { variant: 'success' });
                        } catch (error) {
                            console.error('Error uploading file:', error);
                        }
                    }
                    else{
                        const formData = new FormData();
                        formData.append('file', file[i]);
                        formData.append('postId', response.data._id); 
                        try {
                          const response = await axios.post('http://localhost:1324/files/upload', formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data',
                            },
                          });
                          console.log('File uploaded successfully:', response.data);
                        } catch (error) {
                          console.error('Error uploading file:', error);
                        }
                    }
                } 
            }
            catch(error){
                enqueueSnackbar('Đăng tin thất bại', { variant: 'error' });
                console.log(error);
            }
          }
    };
    
  return (
    <div className='flex justify-center items-center bg-gray-700 bg-opacity-30 h-screen'>
      <div className='bg-white w-2/3 h-auto p-2 m-0 rounded-lg'>
          {listMedia.length == 0 ? (<div className='hidden'></div>) : (
            <div className='w-full float-left justify-center items-center p-2 bg-gradient-to-bl from-blue-600 to-purple-800' style={{overflow: 'scroll'}}>
            <div className='w-screen flex '>
              {listMedia.map((media, index) => (
                  <div key={index} className='h-36 w-1/5 flex justify-center'>
                      {media.type === 'image' ? (
                          <img onClick={() => imgRef.current.click()} src={media.url} className="h-full w-auto object-cover" alt={`media-${index}`} />
                      ) : (
                          <video onClick={() => imgRef.current.click()} src={media.url} className="h-full w-auto object-cover" controls />
                      )}
                  </div>
              ))}
            </div>
        </div>
          )}
          <div className='w-full h-auto block p-2 justify-center text-center'>
              {listMedia.length != 0 ? (<div className='hidden'></div>) : (
                <button onClick={() => imgRef.current.click()} 
                className='hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800 
                bg-black rounded-lg text-white p-2 mb-4'>Add Mediums</button>
              )}
              
              <input className='hidden' type="file" onChange={handleFileChange} ref={imgRef} multiple accept="image/*,video/*"/>
              <p className='font-bold'>Description:</p>
              <div className='p-2 border-2 rounded-lg shadow-lg'>
                <textarea type='text' onChange={handleDescription} className=' h-24 w-full resize-none focus:outline-none'></textarea>
              </div>
              
              <button onClick={handleUpload} className=' px-6 py-2 bg-black text-white rounded-lg mt-2
              hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-800'>Upload</button>
          </div>
          
      </div>
    </div>
  )
}

export default CreatePost