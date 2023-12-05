import { useNavigate } from 'react-router-dom';

export const Filter = ({ setSort, sort, sortType }) => {
  const navigate = useNavigate();

  const sortRecent = () => {
    setSort('mostRecent');
    navigate('/posts/mostRecent');
  };
  const sortPopular = () => {
    setSort('popular');
    navigate('/posts/popular');
  };
  return (
    <div className='bg-[#ffb3c6] my-4 h-13 border border-ff8fab-600 md:w-[650px] md:mx-auto'>
      <div className={`flex p-2 gap-3`}>
        <div
          className={`cursor-pointer rounded-xl py-1 px-2 transition-all ease-in-out
           ${
             sortType === 'popular'
               ? 'text-[#f6f7f9]'
               : '   text-[#f6f7f9] bg-[#fb6f92]'
           }`}
          onClick={sortRecent}
        >
          Most Recent
        </div>
        <div
          className={`cursor-pointer rounded-xl py-1 px-2 transition-all ease-in-out ${
            sortType !== 'popular'
              ? 'text-[#f6f7f9]'
              : ' text-[#f6f7f9]  bg-[#fb6f92]'
          }`}
          onClick={sortPopular}
        >
          Popular
        </div>
      </div>
    </div>
  );
};
