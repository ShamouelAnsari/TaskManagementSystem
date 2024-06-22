import React, { useState } from 'react'
import * as yup from "yup"
import { validator } from '../utilities/projects'
import { addComment } from '../services/taskCommentService'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addTaskComment } from '../store/taskCommentSlice'

function CommentAdd() {
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")
  const { id } = useParams()

  let dispatch = useDispatch()

  async function handleSubmit(e) {
    e.preventDefault()
    let schema = yup.object({
      comment: yup.string().min(5).max(150).required()
    })

    let check = await validator(schema, { comment }).catch(error => { return { error } })
    if (check.error) {
      return setError(check.error)
    }

    let data = await addComment(id, { taskComment: comment }).catch(error => { return { error } })
    if (data.error) {
      return setError(data.error)
    }

    dispatch(addTaskComment(data))
    setComment("")
    setError("")

  }

  function handleChange(e) {
    setComment(e.target.value)
  }

  return (
    <>
      <h1>Comment Add</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='comment'>Comment</label>
          <input type='text' name='comment' value={comment} onChange={handleChange} placeholder='Enter Comment' />
          {error && <div>{error}</div>}
        </div>
        <button type='submit'>Add Comment</button>
      </form>
    </>
  )
}

export default CommentAdd

// import React, { useState } from 'react';
// import * as yup from "yup";
// import { validator } from '../utilities/projects';
// import { addComment } from '../services/taskCommentService';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addTaskComment } from '../store/taskCommentSlice';

// function CommentAdd() {
//   const [comment, setComment] = useState("");
//   const [error, setError] = useState("");
//   const { id } = useParams();
//   let dispatch = useDispatch();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     let schema = yup.object({
//       comment: yup.string().min(5).max(150).required()
//     });

//     let check = await validator(schema, { comment }).catch(error => { return { error } });
//     if (check.error) {
//       return setError(check.error);
//     }

//     let data = await addComment(id, { taskComment: comment }).catch(error => { return { error } });
//     if (data.error) {
//       return setError(data.error);
//     }

//     dispatch(addTaskComment(data));
//     setComment("");
//     setError("");
//   }

//   function handleChange(e) {
//     setComment(e.target.value);
//   }

//   return (
//     <div className="container mt-5">
//       <h1>Add Comment</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor='comment' className="form-label">Comment</label>
//           <input
//             type='text'
//             name='comment'
//             value={comment}
//             onChange={handleChange}
//             placeholder='Enter Comment'
//             className="form-control"
//           />
//           {error && <div className="text-danger mt-2">{error}</div>}
//         </div>
//         <button type='submit' className="btn btn-primary">Add Comment</button>
//       </form>
//     </div>
//   );
// }

// export default CommentAdd;