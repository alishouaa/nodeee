import React, { Component } from 'react';
import AddForm from './AddForm';
import Posts from './posts';
import Header from './Headers'
import Login from './Login'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSave, faUsers, faAddressBook, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

class Home extends Component {

    state = {

        email: '',
        password: '',
        error: ''
    }


    ChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    ChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    }
    onSubmit = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:8080/api/login', data)
            .then(res => {
                if ("token" in res.data) {
                    localStorage.setItem('token', res.data.token);
                    localStorage.setItem('_id', res.data._id);
                    localStorage.setItem('username', res.data.username)
                    axios.defaults.headers.common = { 'Authorization': res.data.token };
                    if (res.data.token) {
                        window.location.reload();
                    } else {
                        return false
                    }
                }
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })
        debugger

    }
    render() {
        if (localStorage.getItem('_id')) {
            return (
                <div>
                    <Header />
                    <div className="row p-0 m-0">
                        <div className="col-md-2 sideBar p-0">
                            <ul>
                                <li><Link to="/Privacy"><FontAwesomeIcon className="mx-2" icon={faUser}>
                                </FontAwesomeIcon>{localStorage.getItem('username')} </Link>
                                </li>
                                <li ><Link to="/Pages"><FontAwesomeIcon className="mx-2" icon={faAddressBook}>
                                </FontAwesomeIcon> الصفحات</Link></li>
                                <li className="res"><Link to="/"> <FontAwesomeIcon className="mx-2 " icon={faUsers}>
                                </FontAwesomeIcon>المجموعات</Link></li>
                                <li className="res"><Link to="/"><FontAwesomeIcon className="mx-2 " icon={faSave}>
                                </FontAwesomeIcon>العناصر المحفوظة</Link></li>
                                <li className="res"><Link to="/"><FontAwesomeIcon className="mx-2 " icon={faQuestionCircle}>
                                </FontAwesomeIcon>حول</Link></li>

                            </ul>
                        </div>
                        <div className="col-md-8 p-0">
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
                                            commentPost={this.props.commentPost}
                                            commentContent={this.props.commentContent}
                                            comment={this.props.comment}
                                            users={this.props.users}


                                        />

                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-2  text">
                            <p>تُوفّر مواقع التواصل الاجتماعي العديد من الإيجابيَّات المختلفة للمُستخدمين ومنها:[٥] القدرة على التواصل مع الآخرين بشكل سهل في أي مكان؛ حيث أصبح المُستخدِم قادرًا على التواصل مع أصدقائه القدامى، أو التعرّف على أصدقاء جدد بطريقة سهلة. السرعة والسهولة في التواصل باستخدام التطبيقات؛ التي يُمكن تنزيلها وتثبيتها على أي نوع من الأجهزة المحمولة واستخدامها في أيّ مكان وزمان. المتابعة المُخصصة للأخبار والأحداث والمواضيع؛ إذ يُمكن للمُستخدِم تخصيص ما يتابعه على وسائل التواصل الاجتماعي ليحصل المحتوى الذي يُناسبه ويُثير اهتمامه، إضافةً إلى الوصول السريع والمباشر إلى الأخبار والمعلومات. الترويج للمُنتجات والخدمات، وتوسيع نطاق أعمالهم ليشمل أكبر عدد من الجمهور المُستهدف من خلال وسائل التواصل الاجتماعي. قضاء وقت فراغ ممتع ، خلال أوقات الاستراحة والإجازات
                            </p>
                        </div>
                    </div>



                </div>
            )
        }
        return (
            <Login
                ChangeEmail={this.ChangeEmail}
                ChangePassword={this.ChangePassword}
                onSubmit={this.onSubmit}
                eamil={this.state.email}
                password={this.state.password}
                error={this.state.error}
            />
        )

    }
}

export default Home;
