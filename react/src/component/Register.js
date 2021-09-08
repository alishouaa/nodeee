import React, { Component } from 'react';
import axios from 'axios'


class Register extends Component {


    state = {
        name: '',
        email: '',
        password: '',
        error: '',
        confirmPassword : ''
    }

    changeName = (e) => {
        this.setState({
            name: e.target.value,
        });
    }
    ChangeEmail = (e) => {
        this.setState({
            email: e.target.value,
        });
    }
    ChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    confirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }
  

    onSubmit = (e) => {
        e.preventDefault();

        if(this.state.password !==this.state.confirmPassword) {
            this.setState({
                error: 'كلمة السر غير متطابقة'
            })
            return
        }

        let data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
        }

        axios.post('http://localhost:3000/api/register', data)
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                axios.defaults.headers.common = { 'Authorization': res.data.token }
                const { history } = this.props;
                history.push("/")
                window.location.reload();


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
              <div className="error">{this.state.error}</div> 
                <form onSubmit={this.onSubmit}>
                <div className="mb-3">
                    <label className="form-label">اسم المستخدم</label>
                    <input type="text" value={this.state.name} className="form-control" onChange={this.changeName} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">البريد الالكتروني</label>
                    <input type="email" value={this.state.email} className="form-control" onChange={this.ChangeEmail} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">كلمة المرور</label>
                    <input type="password" value={this.state.password} className="form-control" onChange={this.ChangePassword} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">كلمة المرور</label>
                    <input type="password" value={this.state.confirmPassword} className="form-control" onChange={this.confirmPassword}required />
                </div>


                <input type="submit" value="التسجيل" className="btn btn-dark" />

            </form>
           </div>
        )
    }
}

export default Register;