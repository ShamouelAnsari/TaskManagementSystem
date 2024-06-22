import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCommentList } from '../services/taskCommentService';
import { useDispatch, useSelector } from 'react-redux';
import { setList } from '../store/taskCommentSlice';

function CommentList() {

  let { id } = useParams();
  let list = useSelector(state => state.taskComment.list)
  const dispatch = useDispatch();

  useEffect(() => {
    getList();
  }, [])

  async function getList() {
    let data = await fetchCommentList(id).catch(error => { return { error } })
    if (data.error) {
      return alert(data.error)
    }
    dispatch(setList((data)))
  }

  return (
    <>
      <h1>Comment List</h1>
      {
        list && list.map((item, index) => {
          return (<p key={index}>{item.comment}</p>)
        })
      }
    </>
  )
}

export default CommentList

// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchCommentList } from '../services/taskCommentService';
// import { useDispatch, useSelector } from 'react-redux';
// import { setList } from '../store/taskCommentSlice';

// function CommentList() {
//   let { id } = useParams();
//   let list = useSelector(state => state.taskComment.list);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getList();
//   }, []);

//   async function getList() {
//     let data = await fetchCommentList(id).catch(error => { return { error } });
//     if (data.error) {
//       return alert(data.error);
//     }
//     dispatch(setList((data)));
//   }

//   return (
//     <div className="container mt-5">
//       <h1 className="mb-4">Comment List</h1>
//       <ul className="list-group">
//         {list && list.map((item, index) => (
//           <li key={index} className="list-group-item">{item.comment}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CommentList;