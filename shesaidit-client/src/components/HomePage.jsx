import { Posts } from './post/Posts';
import { SideBar } from './Sidebar';
import { Link } from 'react-router-dom';
import AddSharpIcon from '@mui/icons-material/AddSharp';

const HomePage = ({ isLoggedIn, modal, setModal, sort, setSort,sortType,setSortType }) => {
  return (
    <div className='flex min-h-screen  max-h-auto bg-[#ffe5ec]  flex-col flex-grow lg:flex-row  '>
      <SideBar />
      <div className='flex flex-col flex-grow mt-16 md:ml-32 bg-[#ffebeb] '>
        {isLoggedIn && (
          <Link to='/createPost'>
            <div className='flex h-11 bg-[#ffb3c6] border   border-white-600 md:w-[650px] md:m-auto'>
              <i className='flex justify-center items-center text-[#f6f7f9] p-3'>
                <AddSharpIcon />
              </i>
              <input
                type='text'
                placeholder='Create Post'
                className='hover:border-pink-500 bg-[#ffe5ec] border border-pink-300 w-full mr-4 my-1 px-3 py-1'
              />
            </div>
          </Link>
        )}

        <Posts
          isLoggedIn={isLoggedIn}
          modal={modal}
          setModal={setModal}
          sort={sort}
          setSort={setSort}
          sortType={sortType}
        />
      </div>
    </div>
  );
};
export default HomePage;
