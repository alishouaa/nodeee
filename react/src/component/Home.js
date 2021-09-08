import React, { Component } from 'react';
import AddForm from './AddForm';
import Posts from './posts';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
import InnerImageZoom from 'react-inner-image-zoom';

class Home extends Component {
    state = {
        posts: [],
        text: '',
        image: null,
        count: [],
        }

    SaveText = (e) => {
        this.setState({
            text: e.target.value
        })
    }
    SaveImage = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }

    /* ---------------------------------------------------- * */

    addSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('avatar', this.state.image);
        formData.append('post', this.state.text)
        formData.append('userId', localStorage.getItem('_id'));

        fetch('http://localhost:3000/api/addPost', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
            .then(res => {
                e.target.text.value = '';
                e.target.file.files = null;
                this.getData();
            })
    }

    /**----------------------------------------------------------------- */

    getData = async () => {
        fetch('http://localhost:3000/api/getPost', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    posts: data.posts.reverse(),
                });


            })
    }

    componentDidMount() {

        this.count()
        this.getData()

    }

    /**----------------------------------------------------------------- */

    deletPost = (index, id) => {
        const data = { "userId": localStorage.getItem('_id') }
        fetch(`http://localhost:3000/api/delete-post/${id}`,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(() => this.setState({ status: 'Delete successful' }));
        let posts = this.state.posts;
        posts.splice(index, 1);
        this.setState({
            posts: posts
        })
    }
    /**----------------------------------------------------------------- */





    editPost = (value, id, index) => {

        const data = {
            "posts": value
        }


        fetch(`http://localhost:3000/api/update-post/${id}`
            ,
            {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(() => this.setState({ status: 'update successful' }));

        let posts = this.state.posts;
        let change = posts[index];
        change['post'] = value;
        this.setState({
            posts
        })

    }

    /**----------------------------------------------------------------- */


    count = () => {
        fetch('http://localhost:3000/api/count-like', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    count: data.posts
                });

                const arr = this.state.count.map(dt => {
                    return (dt)

                })
                this.setState({
                    count: arr
                })


            })

    }
    LikePost = async (id) => {

        const data = {
            "userId": localStorage.getItem('_id'),
            "postId": id
        }
        fetch('http://localhost:3000/api/add-like', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })

    }

    countLikeFunction = (array_elements, value) => {

        array_elements.sort();

        var cnt = 0;
        for (var i = 0; i < array_elements.length; i++) {
            if (array_elements[i].postId == value) {
                cnt++;
            }

        }
        return cnt;
    }

    /**----------------------------------------------------------------- */


    render() {
        if (localStorage.getItem('_id')) {
            return (
                <div>
                    <AddForm
                        addSubmit={this.addSubmit}
                        SaveText={this.SaveText}
                        SaveImage={this.SaveImage}
                    />
                    <div>
                        {
                            this.state.posts.map((post, index) => {
                                return <Posts
                                    deletPost={this.deletPost}
                                    like={this.state.like}
                                    post={post}
                                    index={index}
                                    toggleState={this.toggleState}
                                    LikePost={this.LikePost}
                                    countLike={this.countLikeFunction(this.state.count, post._id)}
                                    count={this.state.count}
                                    key={index}
                                    onChangeInput={this.onChangeInput}
                                    editPost={this.editPost}
                                                                    />

                            })
                        }
                    </div>
                </div>
            )
        }
        return (

            <div>
                <h2 className='title'>المنشورات</h2>
                {
                    this.state.posts.map(post => {
                        return <ul className="card posts">
                            <li className=" card-header user">{post?.userId?.name}</li>
                            <li className=" card-body post">{post.post}</li>
                            <InnerImageZoom src={'http://localhost:3000/' + post.avatar} />

                            <hr />
                            <ul className="button-post">
                                <div className="span">الرجاء تسجيل الدخول من أجل الاعجاب بالمنشور</div>
                                <span>عدد الاعجابات {this.countLikeFunction(this.state.count, post._id)} </span>
                            </ul>
                        </ul>
                    })
                }
            </div>
        )
    }
}

export default Home;