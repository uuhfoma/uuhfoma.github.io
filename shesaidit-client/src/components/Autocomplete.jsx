import { useEffect, useState } from 'react';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import axios from 'axios';

export const Autocomplete = ({ focus, topic, setTopic, refOne }) => {
  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [filtred, setFiltred] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setFiltred(
      data.filter((option) =>
        option.category.toLowerCase().includes(value?.toLowerCase()),
      ),
    );
  }, [data, value, topic]);

  const handleSelect = async (element) => {
    setTopic(element);
    setValue(element);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
    setTopic(e.target.value);
  };

  const fetchCategories = async () => {
    const res = await axios.get(
      `https://us-east-1.aws.data.mongodb-api.com/app/shesaidit-abcvc/endpoint/categories`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );
    setData(res.data);
  };

  return (
    <div className='relative'>
      <div className='relative flex items-center'>
        <i className='absolute p-2 text-pink-600'>
          <SearchSharpIcon />
        </i>

        <input
          value={value}
          type='text'
          placeholder='Choose a topic'
          onChange={handleChange}
          className=' pl-10 flex rounded-md bg-[#ffe5ec] text-[#fb6f92] flex-grow h-9'
          ref={refOne}
        />
      </div>

      {focus && (
        <ul className='bg-[#ffe5ec] text-[#fb6f92] absolute overflow-auto w-full p-2 z-10 border-gray-500 border '>
        {filtred?.map((option) => (
            <li
              className='border-b hover:text-pink-500 border-pink-300 p-2 cursor-pointer '
              key={option._id}
              onClick={() => handleSelect(option.category)}
            >
              {option.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
