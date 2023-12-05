import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import { toast } from 'react-hot-toast';

export const Comment = ({
  parentComment,
  comments,
  fetchComments,
  setModal,
}) => {
  const [isReply, setIsReply] = useState(false);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);

  const { postId } = useParams();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  useEffect(() => {
    if (comment) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [comment]);

  const voteHandler = async (parentComment, voteType) => {
    if (!token) {
      return setModal(true);
    }
    await fetch('https://blog-app-mern-85pk.onrender.com/commentVote', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        commentId: parentComment._id,
        voteType: voteType,
      }),
    }).then((res) => res.json());

    fetchComments();
  };
  const deleteHandler = async () => {
    await fetch('https://blog-app-mern-85pk.onrender.com/deleteComment', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({
        commentId: parentComment._id,
        postId: postId,
      }),
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message));

    fetchComments();
  };

  const subcomments = comments.filter(
    (element) => element.parentComment === parentComment._id,
  );

  const commentDate = () => {
    const commentDate = new Date(parentComment.createdAt);
    const currentDate = new Date();
    const hourDiff = Math.floor((currentDate - commentDate) / (1000 * 60 * 60));

    let timeAgo;
    if (hourDiff < 1) {
      const minuteDiff = Math.floor((currentDate - commentDate) / (1000 * 60));
      return (timeAgo = `${minuteDiff} minutes ago`);
    } else if (hourDiff < 24) {
      return (timeAgo = `${hourDiff} hours ago`);
    } else {
      const dayDiff = Math.floor(hourDiff / 24);
      return (timeAgo = `${dayDiff} days ago`);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      return setModal(true);
    }

    const res = await axios.post(
      'https://blog-app-mern-85pk.onrender.com/createComment',
      {
        body: comment,
        post: postId,
        parentCommentId: parentComment._id ? parentComment._id : null,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    );
    toast.success(res.data.message);
    setComment('');
    setIsReply(false);
    fetchComments();
  };
  return (
    <div className='flex flex-col  border-white-500 text-[#f6f7f9] bg-[#ffb3c6] '>
      <div className='border-l-0 flex p-1 '>
        <div
          onClick={(e) => e.stopPropagation()}
          className='bg-[#fb6f92] flex flex-col justify-start text-center p-1'
          >
          <button
            className='hover:bg-[#ffb3c6] rounded-lg transition-all ease-in-out rounded-lg p-1 '
            onClick={() => {
              voteHandler(parentComment, 'upvote');
            }}
          >
            {parentComment.votedBy[
              parentComment.votedBy.findIndex(
                (element) => element.user === userId,
              )
            ]?.voteType === 'upvote' && token ? (
              <i className='text-2xl  '>
                <ThumbUpIcon />
              </i>
            ) : (
              <i className='text-2xl text-[#f6f7f9] '>
                <ThumbUpOutlinedIcon />
              </i>
            )}
          </button>

          <span className='font-semibold'> {parentComment.vote} </span>
          <button
            className='hover:bg-[#ffb3c6] rounded-lg '
            onClick={() => {
              voteHandler(parentComment, 'downvote');
            }}
          >
            {parentComment.votedBy[
              parentComment.votedBy.findIndex(
                (element) => element.user === userId,
              )
            ]?.voteType === 'downvote' && token ? (
              <i className='text-2xl  '>
                <ThumbDownIcon />
              </i>
            ) : (
              <i className='text-2xl  '>
                <ThumbDownOutlinedIcon />
              </i>
            )}
          </button>
        </div>
        <div>
          <div className='flex  items-center'>
            <div className='mr-1'>{username}</div>
            <div className=' text-sm '>{commentDate()}</div>
          </div>
          <div>{parentComment.body}</div>
          <section className='flex'>
            <div
              onClick={() => setIsReply(!isReply)}
              className='flex hover:bg-[#fb6f92] rounded-lg p-2 transition-all  ease-in-out'
              >
              <div className='flex text-center justify-center items-center pr-1 opacity-95'>
                <i>
                  <ChatBubbleOutlineOutlinedIcon />
                </i>
                <button className='   '>Reply</button>
              </div>
            </div>

            <div
              onClick={deleteHandler}
              className= 'flex hover:bg-[#fb6f92] rounded-lg p-2 transition-all  ease-in-out'
            >
              <div className='flex text-center justify-center items-center pr-1 '>
                <i className='opacity-90'>
                  <DeleteSharpIcon />
                </i>
                <button className=''>Delete</button>
              </div>
            </div>
          </section>
        </div>
      </div>
      {isReply && (
        <form
          onSubmit={submitHandler}
          className='flex justify-center flex-col p-2'
        >
          <textarea
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            className='border bg-[#ffb3c6]  border-whie-500 p-2'
            cols='70'
            rows='5'
            placeholder='What are your thoughts'
          ></textarea>
          <div className='flex justify-end'>
            <button
              disabled={disabled}
              className={` bg-[#ffb3c6]  rounded-lg mt-2 py-2 px-4 ${
                !disabled
                  ? '  hover:opacity-90'
                  : 'cursor-not-allowed opacity-75 '
              }`}
            >
              Reply
            </button>
          </div>
        </form>
      )}

      {subcomments.length > 0 && (
        <div style={{ marginLeft: `${parentComment.depth * 10}px` }}>
          {subcomments.map((subcomment) => (
            <Comment
              key={subcomment._id}
              parentComment={subcomment}
              comments={comments}
              fetchComments={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
};
