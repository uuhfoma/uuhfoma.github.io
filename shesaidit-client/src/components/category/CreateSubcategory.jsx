import { useEffect, useRef, useState } from 'react';
import { SideBar } from '../Sidebar';
import { Autocomplete } from '../Autocomplete';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CreateSubcategory = () => {
  const refOne = useRef(null);
  const [topic, setTopic] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [focusOne, setFocusOne] = useState(false);

  const handleCloseSearch = (e) => {
    //If user click outside the input
    if (!refOne.current.contains(e.target)) {
      setFocusOne(false);
    } else {
      setFocusOne(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'https://us-east-1.aws.data.mongodb-api.com/app/shesaidit-abcvc/endpoint/createSubcategory',
        {
          category: topic,
          subcategory: subcategory,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        },
      );
      toast.success(res.data.message);
      setSubcategory('');
      setTopic('');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='bg-[#fb6f92] min-h-screen' onClick={handleCloseSearch}>
      <SideBar submitHandler={submitHandler} />
      <div className='pt-20 lg:ml-80 md:w-[650px] md:mx-auto h-full mx-2 text-[#ffe5ec]   '>
        <h1 className='mb-5 text-2xl font-medium '>Create a subcategory</h1>
        <Autocomplete
          focus={focusOne}
          refOne={refOne}
          topic={topic}
          setTopic={setTopic}
        />
        <form className='flex flex-col gap-1' onSubmit={submitHandler}>
          <p className='mt-2'>Name</p>
          <input
            className='py-1 px-2 rounded-lg h-12 bg-[#ffe5ec] border-pink-600 border text-[#fb6f92] '
            onChange={(e) => setSubcategory(e.target.value)}
            type='text'
            placeholder='s/'
            value={subcategory}
            required
          />
          <div className=' flex items-end '>
            <button className='bg-pink-600 mt-5 text-white  rounded-lg hover:opacity-90 px-3 py-2'>
              Create Subcategory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateSubcategory;
