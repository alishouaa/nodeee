import React, { useRef, useState } from 'react';
import Header from './Headers'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
  const renderPost = () => {
    const mypost = props.posts.filter((post) => {
      return post.userId?._id === localStorage.getItem('_id')
    })

    let vide = <h1 className="text-center py-5 red">لا توجد منشورات</h1>;
    if (mypost.length) {
      vide = mypost.map((post, index) => {
        return (
          <div key={index}>

            <li className="card-header user"><img id="img" style={{ width: "50px" }} className="rounded-circle" src={'http://localhost:8080/' + post.userId.avatar} /> <span></span>  {post.userId.name}    </li>
            <li className="card-body post title">{post.post}</li>
            <li className="card-body post">{post.content}</li>

            {!post.avatar ? <span></span> : <img id="img" src={'http://localhost:8080/' + post.avatar} alt="الصورة غير متوفرة على الخادم" />
            }
            <ul className="card-footer text-center button-post">
 
              <button className="btn btn-danger mx-2" id="delete" onClick={() => props.deletPost(index, post?._id)}>حذف المنشور</button>
              <li className="d-block p-2 d-md-inline p-md-5" onClick={() => toggleState(post)}>تعديل المنشور</li>
            </ul>
            <br />

          </div>
        )

      })
    }
    return vide;

  }
  const myUser = props.users.filter((user) => {
    return user._id === localStorage.getItem('_id')
  })
  const userView = myUser.map((user, index) => {
    return <div key={index} className="profile">
      <div className="p-0 m-0">
        <ul className="row">
          <div className="col-md-6 ">
            <li className="photo"><img id="img" className="rounded-circle " src={'http://localhost:8080/' + user.avatar} alt="الصورة غير متوفرة على الخادم" /> </li>
          </div>
          <div className="col-md-6 information">
            <li><h1>{user.name}</h1></li>
            <li>البريد الإلكتروني :{user.email}</li>
            <li>رقم الهاتف : {user.number}</li>
            <li>الدولة : {user.company}</li>
            <li>تاريخ الإنشاء :{user.createdAt}</li>
          </div>
        </ul>


      </div>
    </div>

  })

  return (

    isEdit ? (

      <div>
        <Header />
        {userView}
        <div className="row m-0">
          <div className="col-md-2">
            <br />
          </div>
          <div className="col-md-8">
            <h2 className='title text-center'>منشوراتي</h2>

            <ul className="card  posts">
              {renderPost()}
            </ul>
          </div>
          <div className="col-md-2">
            <br />
          </div>
        </div>
      </div>
    )
      : (

        <div>
          <Header />
          <div className="row m-0">
            <div className="col-md-2">
              <br />
            </div>
            <div className="col-md-8">
              <ul className="card  posts">
                <form onSubmit={(event) => onChangeInput(post?._id, event)} >
                  <ul className="card  posts">
                    <li className="card-header user">{post?.userId?.name}</li>
                    <input defaultValue={post?.post} ref={inputRef} type="text" className="form-control" required />
                    <textarea defaultValue={post?.content} ref={inputRefContent} type="text" className="form-control" required />
                    <input type="submit" className="btn btn-danger mt-4" value="تعديل المنشور" />
                    <hr />
                    <img className="p-0" src={'http://localhost:8080/' + post.avatar} alt="الصورة غير متوفرة على الخادم" />

                  </ul>
                </form>             </ul>
            </div>
            <div className="col-md-2">
              <br />
            </div>
          </div>
        </div>

      )
  )


}

export default Privacy;