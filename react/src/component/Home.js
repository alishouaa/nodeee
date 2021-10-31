import React, { Component } from 'react';
import AddForm from './AddForm';
import Posts from './posts';



class Home extends Component {



    render() {
        
        if (localStorage.getItem('_id')) {
            return (
                <div>
                    <AddForm
                        addSubmit={this.props.addSubmit}
                        SaveText={this.props.SaveText}
                        SaveImage={this.props.SaveImage}
                        SaveContent={this.props.SaveContent}
                    />
                    <div>
                        {
                            this.props.posts.map((post, index) => {
                                return <Posts
                                    like={this.props.like}
                                    post={post}
                                    index={index}
                                    LikePost={this.props.LikePost}
                                    deleteLike={this.props.deleteLike}
                                    countLike={this.props.countLikeFunction(this.props.count, post._id)}
                                    count={this.props.count}
                                    key={index}
                                    onChangeInput={this.props.onChangeInput}

                                />

                            })
                        }
                    </div>


                </div>
            )
        }
        return this.props.posts.map(post => {
            return (
                <div>
                    <ul className="card  posts">
                        <li className="card-header user">{post?.userId?.name}</li>
                        <li className="card-body post title">{post.post}</li>
                        <li className="card-body post">{post.content}</li>

                        <hr />
                        <img id="img" src={'http://localhost:8080/' + post.avatar} alt="الصورة غير متوفرة على الخادم" />



                        <ul className="card-footer text-center button-post">
                            <li>الرجاء تسجيل الدخول من أجل السماح للمستخدم الاعجاب بالمنشور</li>                        </ul>
                    </ul>
                </div>
            )
        })


    }
}

export default Home;

