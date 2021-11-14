import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faUser } from '@fortawesome/free-solid-svg-icons';
const Posts = (props) => {


    const [comm, setComm] = useState(false);


    const handleCloseLi = () => setComm(false);
    const handleShowLi = () => setComm(true);



    var color = {
        color: "grey"
    }
    let arr = props.count;
    let idpost = props.post._id;

    const result = arr.filter((post) => post.postId === idpost);
    let count = result.length;

    if (result.find(o => o.userId === localStorage.getItem("_id"))) {
        color = {
            color: "red"
        }
    } else {
        color = {
            color: "grey"
        }
    }

    let timer = null;

    const plusLike = (id) => {

        let array = arr.filter((o) => {
            return o.postId === id && o.userId === localStorage.getItem("_id")
        })
        if (array.find(k => k.postId === id)) {
            clearTimeout(timer);
            timer = null;
            timer = setTimeout(() => {
                props.deleteLike(id);
            }, 250);

        } else {
            clearTimeout(timer);
            timer = null;
            timer = setTimeout(() => {
                props.LikePost(id)
            }, 250);

        }


    }

    return (


        <div>
            <div>
                <ul className="card  posts mx-0">
                    <li className="card-header user"><img id="img" style={{ width: "50px" }} className="rounded-circle" src={'http://localhost:8080/' + props.post.userId.avatar} /> <span></span>  {props.post.userId.name}    </li>
                    <li className="card-body post title">{props.post.post}</li>
                    <li className="card-body post">{props.post.content}</li>


                    {!props.post.avatar ? <span></span> : <img id="img" src={'http://localhost:8080/' + props.post.avatar} alt="الصورة غير متوفرة على الخادم" />
                    }

                    <ul className="card-footer text-center button-post">
                        <li className="d-sm-block p-2 d-md-inline p-md-5" style={color} id="like" onClick={() => plusLike(props.post._id)}>
                            <FontAwesomeIcon className="mx-2" icon={faThumbsUp}>
                            </FontAwesomeIcon>إعجاب </li>
                        <Button onClick={handleShowLi} className="bck">
                            <li className="d-sm-block p-2 d-md-inline p-md-5">تعليق</li>
                        </Button>
                        <Modal id="modal" show={comm} size="lg" onHide={handleCloseLi}>
                            <Modal.Body className="p-3">
                                <h5>عدد التعليقات : {props.post.comment.length}</h5>
                                <div className="row">
                                    <div className="col-md-6">
                                        {props.post.comment.map((comment, index) => {
                                            let searchUsers = props.users.filter((user) => {
                                                return user._id === comment.author
                                            })
                                            let test = searchUsers.map(user => {
                                                return user.name
                                            })
                                            let testing = searchUsers.map(user => {
                                                return user.avatar
                                            })
                                            return (
                                                <ul className="model-comment py-3" key={index}>
                                                    <li className="author"><img id="img" style={{ width: "50px" }} className="rounded-circle" src={'http://localhost:8080/' + testing} /> <span></span>  {test}    </li>
                                                    <li style={{ marginRight: "100px" }} className="author">{comment.content}</li>
                                                </ul>

                                            )

                                        })}
                                    </div>
                                    <div className="col-md-6">

                                        <form onSubmit={(event) => props.commentPost(props.post?._id, event)}>
                                            <input required value={props.comment} className="form-control my-2" placeholder="اكتب تعليق" type="text" onChange={props.commentContent} />
                                            <input type="submit" className="btn btn-primary" value="تعليق" />
                                        </form>
                                    </div>
                                </div>

                            </Modal.Body>
                        </Modal>
                        <li style={{ color: "black", fontWeight: "normal" }} >{count} </li>
                    </ul>
                    <h5 className="px-3">عدد التعليقات : {props.post.comment.length}</h5>

                    {props.post.comment.map((comment, index) => {
                        if (props.post.comment.length === 1) {
                            let searchUsers = props.users.filter((user) => {
                                return user._id === comment.author
                            })
                            let test = searchUsers.map(user => {
                                return user.name
                            })
                            let testing = searchUsers.map(user => {
                                return user.avatar
                            })
                            return (
                                <ul className="model-comment py-3" key={index}>
                                    <li className="author"><img id="img" style={{ width: "50px" }} className="rounded-circle" src={'http://localhost:8080/' + testing} /> <span></span>  {test}    </li>
                                    <li style={{ marginRight: "100px" }} className="author">{comment.content}</li>
                                </ul>

                            )

                        }


                    })}



                </ul>

            </div>
        </div>


    )

}

export default Posts;