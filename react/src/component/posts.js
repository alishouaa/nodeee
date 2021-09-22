import React, { useRef, useState } from 'react';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';
const Posts = (props) => {


    var inputRef = useRef(null)
    var inputRefContent = useRef(null)


    const [count, setCount] = useState(props.countLike);
    const [isEdit, setIsEdit] = useState(true);


    const onChangeInput = (id, event) => {
        event.preventDefault();
        props.editPost(inputRef.current?.value,inputRefContent.current?.value, id, props.index)
        toggleState();

    }
    const toggleState = () => {
        setIsEdit(!isEdit)
    }

    var style = {
        display: "inline"
    }

    var color = {
        color: "grey"
    }
    let arr = props.count;

    if (props.post.userId._id !== localStorage.getItem('_id')) {
        style = {
            display: "none"
        };
    }
    if (arr.find(o => o.userId === localStorage.getItem('_id')) && arr.find(o => o.postId === props.post._id)) {
        color = {
            color: "red"
        }
    }


    const plusLike = () => {
        if (arr.find(o => o.userId === localStorage.getItem('_id')) && arr.find(o => o.postId === props.post._id)) {
            setCount(count-1)
        }else {
            setCount(count+1)

        }

    }
    return (
        isEdit ? (
            <div>
                <h2 className='title' >المنشورات</h2>
                <ul className="card  posts">
                    <li className="card-header user">{props.post?.userId?.name}</li>
                    <li className="card-body post title">{props.post.post}</li>
                    <li className="card-body post">{props.post.content}</li>

                    <hr />
                    <InnerImageZoom src={'http://localhost:8080/' + props.post.avatar} />
                    <ul className="card-footer text-center button-post">
                        <li className="d-block p-2 d-md-inline p-md-5" style={color} id="like" onClick={() => props.LikePost(props.post._id) && plusLike()} >إعجاب </li>
                        <li className="d-block p-2 d-md-inline p-md-5" id="delete" style={style} onClick={() => props.deletPost(props.index, props.post._id)}>حذف المنشور</li>
                        <li className="d-block p-2 d-md-inline p-md-5" style={style} onClick={() => toggleState()}>تعديل المنشور</li>
                        <span className="text-center">{count} </span>
                    </ul>
                </ul>
            </div>
        )
            : (
                <form onSubmit={(event) => onChangeInput(props.post._id, event)} >
                    <ul className="card  posts">
                        <li className="card-header user">{props.post?.userId?.name}</li>
                        <input defaultValue={props.post.post} ref={inputRef} type="text" className="form-control" required />
                        <textarea defaultValue={props.post.content} ref={inputRefContent} type="text" className="form-control" required />
                        <input type="submit" className="btn btn-danger mt-4" value="تعديل المنشور" />
                        <hr />
                        <img src={'http://localhost:8080/' + props.post.avatar} />

                    </ul>
                </form>
            )
    )

}

export default Posts;