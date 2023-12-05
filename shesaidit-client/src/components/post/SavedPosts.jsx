import axios from 'axios';
import { useEffect, useState } from 'react';
import { SideBar } from '../Sidebar';
import { Post } from './Post';

const SavedPosts = ({ setModal, isLoggedIn }) => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await axios.get(
      'https://blog-app-mern-85pk.onrender.com/savedPosts',
      {
        headers: {
          Authorization: token,
        },
      },
    );
    setPosts(res.data);
  };

  return (
    <div className=' bg-[#fb6f92] min-h-screen'>
      <SideBar />
      <div className='pt-20 md:ml-32 bg-[#fb6f92] text-[#ffe5ec]'>
        <h1 className='md:w-[650px] md:mx-auto text-2xl mb-2 font-semibold'>
          Saved Posts
        </h1>
        {posts &&
          posts?.map((post) => (
            <Post
              post={post}
              setModal={setModal}
              isLoggedIn={isLoggedIn}
              fetchData={fetchData}
            />
          ))}
      </div>
    </div>
  );
};
export default SavedPosts;
