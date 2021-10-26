import React, {  useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const Posts = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [count, setCount] = useState(props.countLike);

    var color = {
        color: "grey"
    }
    let arr = props.count;

    if (arr.find(o => o.userId === localStorage.getItem('_id')) && arr.find(o => o.postId === props.post._id)) {
        color = {
            color: "red"
        }
    }


    const plusLike = () => {
        if (arr.find(o => o.userId === localStorage.getItem('_id')) && arr.find(o => o.postId === props.post._id)) {
            setCount(count => count - 1)
        } else {
            setCount(count => count + 1)
        }

    }


    return (


        <div>
            <h2 className='title'>المنشورات</h2>
            <ul className="card  posts">
                <li className="card-header user">{props.post?.userId?.name}</li>
                <li className="card-body post title">{props.post.post}</li>
                <li className="card-body post">{props.post.content}</li>

                <hr />

                <Button variant="outline-light" onClick={handleShow}>
                    <img id="img" src={'http://localhost:8080/' + props.post.avatar} alt="الصورة غير متوفرة على الخادم" />
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Body id="modal">
                        <img id="img" src={'http://localhost:8080/' + props.post.avatar} alt="الصورة غير متوفرة على الخادم" />
                    </Modal.Body>
                </Modal>

                <ul className="card-footer text-center button-post">
                    <li className="d-block p-2 d-md-inline p-md-5" style={color} id="like" onClick={() => props.LikePost(props.post._id) && plusLike()} >إعجاب </li>
                    <span className="text-center" >{count} </span>
                </ul>
            </ul>
        </div>


    )

}

export default Posts;