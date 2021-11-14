import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBookOpen, faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';



class Header extends Component {


    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        localStorage.removeItem('username');
        axios.defaults.headers.common = { 'Authorization': '' };
        window.location.reload();

    }
    render() {

        if (localStorage.getItem('token')) {
            return (
                <div>
                    <ul className="navBar">
                        <div className="row m-0">
                            <div className="col-md-2">
                                <li className="logo">
                                    <FontAwesomeIcon className="mx-3" icon={faBookOpen}>
                                    </FontAwesomeIcon>
                                    وجه الكتاب</li>
                            </div>
                            <div className="col-md-10">
                                <li> <Link to="/"><FontAwesomeIcon className="mx-3" icon={faHome}>
                                    </FontAwesomeIcon> الصفحة الرئيسية </Link></li>
                                <li> <Link to="/Privacy"><FontAwesomeIcon className="mx-3" icon={faUser}>
                                    </FontAwesomeIcon>  الصفحة الشخصية </Link></li>
                                <li onClick={this.logout}> <Link to="/"> تسجيل الخروج</Link></li>

                            </div>

                        </div>
                    </ul>

                    {/* <Navbar bg="light" expand={false}>
                        <Container fluid>
                            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
                            <Navbar.Toggle aria-controls="offcanvasNavbar" />
                            <Navbar.Offcanvas
                                id="offcanvasNavbar"
                                aria-labelledby="offcanvasNavbarLabel"
                                placement="end"
                            >
                                <Offcanvas.Body>
                                    <Offcanvas.Title id="offcanvasNavbarLabel">Offcanvas</Offcanvas.Title>
                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar> */}
                </div>
            )
        }
        return (
            <div>
                <ul className="navBar">
                    <div className="row">
                        <div className="col-md-2">
                            <li className="logo">
                                <FontAwesomeIcon className="mx-2" icon={faBookOpen}>
                                </FontAwesomeIcon>
                                وجه الكتاب</li>
                        </div>
                        <div className="col-md-10">
                            <li> <Link to="/">العودة إلى تسجيل الدخول <FontAwesomeIcon className="mx-2" icon={faArrowLeft}>
                            </FontAwesomeIcon></Link></li>

                        </div>

                    </div>

                </ul>
            </div>
        )
    }
}

export default Header;