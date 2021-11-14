import React, { useState } from 'react';
import Header from './Headers'
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
const PostPage = (props) => {
    const [text, setText] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState(null)
    const [isOpen, setIsOpen] = useState(false);


    const toggle = () => setIsOpen(!isOpen);
    const SaveTextPage = (e) => setText(e.target.value)
    const SaveContentPage = (e) => setContent(e.target.value)
    const SaveImagePage = (e) => setImage(e.target.files[0])

    const onSubmit = async (pageId, event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('post', text);
        formData.append('content', content)
        formData.append('avatar', image)
        formData.append('userId', localStorage.getItem('_id'));

        fetch(`http://localhost:8080/api/postPages/${pageId}`, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
            .then(res => {
                event.target.text.value = '';
                event.target.content.value = '';
            })
        const { history } = props;
        history.push("/")

    }
  

    return (
        <div>
            <Header />
            <div>
                {props.location.get.map((page, index) => {
                    debugger
                    return (
                        <div key={index} className="pagepost">
                            <img style={{ width: "100%", height: "500px" }} src={'http://localhost:8080/' + page.avatar} alt="الصورة غير متوفرة على الخادم" />
                            <ul class="list-group  my-2">
                                <li class="list-group-item">اسم الصفحة : <span>{page.name}</span></li>
                                <li class="list-group-item"> الصنف :<span>{page.categories}</span></li>
                                <li class="list-group-item"> اسم منشئ الصفحة :<span>{page.authorId.name}</span></li>
                                <li class="list-group-item"> تاريخ إنشاء  الصفحة :<span>{page.createdAt}</span></li>
                                <li class="list-group-item"> عدد الاعجابات بالصفحة : لم يحدد بعد</li>
                            </ul>


                            <div className="row p-0 m-0">
                                <div className="col-md-2">
                                    <br />
                                </div>
                                <div className="col-md-8 mt-3">
                                    <div className="form">
                                        <form onSubmit={(event) => onSubmit(page._id, event)}>
                                            <div className="mb-3">
                                                <div className="pb-4">
                                                    <h5 className="d-inline" style={{ marginBottom: '1rem' }}> ?بماذا تفكّر</h5>
                                                    <input type="submit" className="btn btn-dark d-inline" style={{ float: "left", backgroundColor: "#141359" }} value="نشر" />
                                                </div>

                                                <input type="text" id="text" onChange={SaveTextPage} className="form-control my-2" required placeholder="العنوان.." />
                                                <textarea type="text" id="content" onChange={SaveContentPage} className="form-control my-2" required placeholder="المحتوى.." />
                                                <div className="btn btn-success" onClick={toggle}>
                                                    <FontAwesomeIcon className="mx-2" icon={faPlus}>
                                                    </FontAwesomeIcon> إضافة صورة</div>
                                                <Collapse isOpen={isOpen}>
                                                    <input class="form-control mt-2" id="inputGroupFile02" type="file" onChange={SaveImagePage} name="myImage" accept="image/*" />
                                                </Collapse>

                                            </div>
                                        </form>

                                    </div>
                                    {page.posts.slice(0).reverse().map((post, index) => {
                                        let searchUsers = props.location.state.filter((user) => {
                                            return user._id === post.userId
                                        })
                                        let test = searchUsers.map(user => {
                                            return user.name
                                        })
                                        let testing = searchUsers.map(user => {
                                            return user.avatar
                                        })
                                        return (
                                            <div key={index}>
                                                <ul className="card  posts">
                                                    <li className="card-header user"><img id="img" style={{ width: "50px" }} className="rounded-circle" src={'http://localhost:8080/' + testing} /> <span></span>  {test}    </li>

                                                    <li className="card-body post title">{post.post}</li>
                                                    <li className="card-body post">{post.content}</li>

                                                    <hr />
                                                    <img id="img" src={'http://localhost:8080/' + post.avatar} alt="الصورة غير متوفرة على الخادم" />
                                                    <ul className="card-footer">
                                                        <br />
                                                    </ul>



                                                    {/* <ul className="card-footer text-center button-post">
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
                                                                            return (
                                                                                <ul className="model-comment pt-3" key={index}>
                                                                                    <li className="author">{comment.author}</li>
                                                                                    <li>{comment.content}</li>
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
                                                            return (
    
                                                                <ul className="model-comment pt-3" key={index}>
                                                                    <li className="author">{comment.author}</li>
                                                                    <li className="content">{comment.content}</li>
                                                                </ul>
    
                                                            )
                                                        }
    
    
                                                    })} */}


                                                </ul>

                                            </div>
                                        )
                                    })}

                                </div>
                                <div className="col-md-2">
                                    <br />
                                </div>
                            </div>
                        </div>

                    )
                })}
            </div>

        </div>

    )

}

export default PostPage;