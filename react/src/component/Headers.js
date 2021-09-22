import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'


class Header extends Component {
  

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('_id');
        axios.defaults.headers.common = { 'Authorization': '' };
        window.location.reload();

    }
    render() {

        if (localStorage.getItem('token')) {
            return (
                <div>
                    <ul className="navBar">
                        <li onClick={this.logout}> <Link to="/"> تسجيل الخروج</Link></li>

                    </ul>
                </div>
            )
        }
        return (
            <div>
                <ul className="navBar">
                    <li className="d-block d-md-inline"> <Link to="/">الصفحة الرئيسية</Link></li>
                    <li> <Link to="/login">تسجيل الدخول</Link></li>

                </ul>
            </div>
        )
    }
}

export default Header;