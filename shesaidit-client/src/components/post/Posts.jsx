import React, { useEffect, useState } from 'react';
import { Post } from './Post';
import { Filter } from '../Filter';
import { useParams } from 'react-router-dom';

export const Posts = ({ isLoggedIn, setModal, sort, setSort }) => {
  const [posts, setPosts] = useState([]);
  const { sortType } = useParams();

  useEffect(() => {
    fetchData();
  }, [sort, sortType]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://us-east-1.aws.data.mongodb-api.com/app/shesaidit-abcvc/endpoint/posts/${sortType}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className='sm:mx-5'>
      <Filter sort={sort} setSort={setSort} sortType={sortType} />
      {posts.map((post) => (
        <Post
          key={post._id.$oid} // Assuming _id is represented as {"$oid": "someId"}
          post={post}
          fetchData={fetchData}
          isLoggedIn={isLoggedIn}
          setModal={setModal}
        />
      ))}
    </div>
  );
};