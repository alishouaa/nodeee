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
        return <div>
            <h3>يجب تسجيل الدخول من أجل رؤية المنشورات</h3>
            <h2>اكاديمية حاسوب  2021 ©</h2>
        </div>
    }
}

export default Home;

