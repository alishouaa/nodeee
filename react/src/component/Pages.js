import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Headers'
import FormPages from './FormPages'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSave, faUsers, faAddressBook, faQuestionCircle, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
class Pages extends Component {
    state = {
        name: '',
        categories: '',
        image: null,
        pages: [],
        show: false,
        namePage: '',
        pageSelect: [],
        users: []
    }
    handleShowLi = () => {
        this.setState({
            show: true
        })
    }

    handleCloseLi = () => {
        this.setState({
            show: false
        })
    }

    ChangeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }
    ChangeCategories = (e) => {
        this.setState({
            categories: e.target.value,
        });
    }
    ChangeImage = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }
    ChangeNamePage = (e) => {
        this.setState({
            namePage: e.target.innerText,
        }, () => {
            const name = this.state.namePage
            this.pageSelect(name)
        });
    }




    onNewPage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('avatar', this.state.image);
        formData.append('name', this.state.name)
        formData.append('categories', this.state.categories)
        formData.append('authorId', localStorage.getItem('_id'));

        fetch('http://localhost:8080/api/addPages', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'multipart/form-data'
            },
        })
            .then(res => res.json())
        this.setState({
            name: '',
            categories: '',
            image: null
        })
        this.getPages();

    }
    getPages = async () => {
        fetch('http://localhost:8080/api/getPages', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    pages: data.page.reverse(),
                });
            })
    }
    getUser = async () => {
        fetch('http://localhost:8080/api/get-user', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    users: data.users
                })
            })
    }


    componentDidMount() {
        this.getPages();
        this.getUser();
    }
    pageSelect = async (namePage) => {

        fetch(`http://localhost:8080/api/getOnePage/${namePage}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    pageSelect: data.page
                });
            })

    }



    render() {
        const name = this.state.pageSelect
        const show = this.state.show
        const users = this.state.users
        return (
            <div>
                <Header />
                <div className="row p-1 m-0">
                    <div className="col-md-2 sideBar p-0">
                        <ul>
                            <li><Link to="/Privacy"><FontAwesomeIcon className="mx-2" icon={faUser}>
                            </FontAwesomeIcon>{localStorage.getItem('username')} </Link>
                            </li>
                            <li><Link to="/Pages"><FontAwesomeIcon className="mx-2" icon={faAddressBook}>
                            </FontAwesomeIcon> الصفحات</Link></li>
                            <li className="res"><Link to="/"> <FontAwesomeIcon className="mx-2" icon={faUsers}>
                            </FontAwesomeIcon>المجموعات</Link></li>
                            <li className="res"><Link to="/"><FontAwesomeIcon className="mx-2" icon={faSave}>
                            </FontAwesomeIcon>العناصر المحفوظة</Link></li>
                            <li className="res"><Link to="/"><FontAwesomeIcon className="mx-2" icon={faQuestionCircle}>
                            </FontAwesomeIcon>حول</Link></li>

                        </ul>
                    </div>
                    <div className="col-md-8 p-0">
                        <FormPages
                            categories={this.state.categories}
                            name={this.state.name}
                            ChangeName={this.ChangeName}
                            ChangeCategories={this.ChangeCategories}
                            onNewPage={this.onNewPage}
                            ChangeImage={this.ChangeImage}


                        />


                        <div className="row">
                            {this.state.pages.map((page, index) => {
                                return (
                                    <ul class="list-group my-2" key={index}>
                                        <li class="list-group-item">
                                            <img style={{ width: "70px" }} className="rounded-circle mx-3" src={'http://localhost:8080/' + page.avatar} alt="الصورة غير متوفرة على الخادم" />
                                            <h5 onClick={this.ChangeNamePage} style={{ display: "inline" }}>
                                                <Button className="m-3 button-page" onClick={this.handleShowLi}>
                                                    {page.name}
                                                </Button>
                                                <Modal show={show} onHide={this.handleCloseLi}>
                                                    <Modal.Body className="p-3">
                                                        <Link to={{ pathname: "/viewPage", get: name, state: users }} style={{ color: "black", textDecoration: "none" }} >
                                                            <FontAwesomeIcon className="mx-2" icon={faArrowLeft}>
                                                            </FontAwesomeIcon> الذهاب للصفحة
                                                        </Link>
                                                    </Modal.Body>
                                                </Modal>

                                            </h5>
                                        </li>
                                        <li style={{ backgroundColor: "#f1ecec" }} class="list-group-item">{page.categories}</li>




                                    </ul>
                                )
                            })}

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
}

export default Pages;