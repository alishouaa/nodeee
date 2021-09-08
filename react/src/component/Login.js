import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



class Register extends Component {
    


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
        axios.post('http://localhost:3000/api/login', data)
            .then(res => {
                if("token" in res.data)
               {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token };
                if (res.data.token) {
                    const { history } = this.props;
                    history.push("/")
                    window.location.reload();
                }else{
                    return false
                }
               }
            })

            .catch(err => {
                this.setState({
                    error: err.response.data.message
                });
            })

    }

    render() {
        return (
            <div>
                <div className="error" >{this.state.error}</div>
                <form className="form-submit" onSubmit={this.onSubmit}>

                    <div className="mb-3">
                        <label className="form-label">البريد الالكتروني</label>
                        <input type="email" required value={this.state.email} className="form-control" onChange={this.ChangeEmail} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">كلمة المرور</label>
                        <input type="password" required value={this.state.password} className="form-control" onChange={this.ChangePassword} />
                    </div>
                    <input type="submit" value="التسجيل" className="btn btn-dark" />

                    <li> <Link to="/register">إنشاء حساب جديد</Link></li>

                </form>
            </div>
        )
    }
}

export default Register;