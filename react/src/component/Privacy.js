import React, { useRef, useState } from 'react';

const Privacy = (props) => {

  const [isEdit, setIsEdit] = useState(true);
  const [post, setPost] = useState(null)
  var inputRef = useRef(null)
  var inputRefContent = useRef(null)

  const onChangeInput = (id, event) => {
    event.preventDefault();
    props.editPost(inputRef.current.value, inputRefContent.current.value, id)
    toggleState();

  }
  const toggleState = (post) => {
    setIsEdit(!isEdit)
    setPost(post)
  }
  const mypost = props.posts
  .filter((post) => {
    return post.userId?._id === localStorage.getItem('_id')
  })
  const contentview = mypost.map((post, index) => {
    return <div>

      <li className="card-header user">{post.userId?.name}</li>
      <li className="card-body post title">{post.post}</li>
      <li className="card-body post">{post.content}</li>

      <hr />


      <img id="img" src={'http://localhost:8080/' + post.avatar} />

      <ul className="card-footer text-center button-post">
        <li className="d-block p-2 d-md-inline p-md-5" id="delete" onClick={() => props.deletPost(index,post?._id)}>حذف المنشور</li>
        <li className="d-block p-2 d-md-inline p-md-5" onClick={() => toggleState(post)}>تعديل المنشور</li>
      </ul>
    </div>

  })
  return (

    isEdit ? (

      <div>
        <h2 className='title'>منشوراتي</h2>
        <ul className="card  posts">
          {contentview}
        </ul>
      </div>
    )
      : (
        <form onSubmit={(event) => onChangeInput(post?._id, event)} >
          <ul className="card  posts">
            <li className="card-header user">{post?.userId?.name}</li>
            <input defaultValue={post?.post} ref={inputRef} type="text" className="form-control" required />
            <textarea defaultValue={post?.content} ref={inputRefContent} type="text" className="form-control" required />
            <input type="submit" className="btn btn-danger mt-4" value="تعديل المنشور" />
            <hr />
            <img src={'http://localhost:8080/' + post.avatar} />

          </ul>
        </form>
      )
  )


}

export default Privacy;