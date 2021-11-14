import React, { Component } from 'react';
import axios from 'axios'
import Header from './Headers'

class Register extends Component {


    state = {
        name: '',
        email: '',
        password: '',
        error: '',
        confirmPassword: '',
        number: '',
        company: '',
        profile: null,
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
    ChangeNumber = (e) => {
        this.setState({
            number: e.target.value
        });
    }
    ChangeCompany = (e) => {
        this.setState({
            company: e.target.value
        });
    }
    ChangeImage = (e) => {
        this.setState({
            profile: e.target.files[0]
        });
    }



    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                error: 'كلمة السر غير متطابقة'
            })
            return
        }
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('email', this.state.email)
        formData.append('password', this.state.password)
        formData.append('number', this.state.number);
        formData.append('company', this.state.company);
        formData.append('avatar', this.state.profile);

        axios({
            method: "post",
            url: "http://localhost:8080/api/register",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(res => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('_id', res.data._id);
                localStorage.setItem('username', res.data.username);

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
        console.log(this.state.company)
        return (

            <div>
                <Header />
                <div className="error">{this.state.error}</div>
                <form className="container py-4" onSubmit={this.onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">اسم المستخدم</label>
                        <input type="text" value={this.state.name} className="form-control" onChange={this.changeName} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">البريد الالكتروني</label>
                        <input type="email" value={this.state.email} className="form-control" onChange={this.ChangeEmail} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">الدولة</label>
                        <select class="form-select" onChange ={this.ChangeCompany} aria-label="Default select example">
                            <option value="لم يحدد" selected>اختر الدولة</option>
                            <option value="لبنان">لبنان</option>
                            <option value="سوريا">سوريا</option>
                            <option value="قطر">قطر</option>
                            <option value="السعودية">السعودية</option>
                            <option value="الكويت">الكويت</option>
                            <option value="فلسطين">فلسطين</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">رقم الهاتف</label>
                        <input type="text" value={this.state.number} className="form-control" onChange={this.ChangeNumber} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">صورتك الشخصية</label>
                        <input required class="form-control mt-2" id="inputGroupFile02" type="file" onChange={this.ChangeImage} name="myImage" accept="image/*" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">كلمة المرور</label>
                        <input type="password" value={this.state.password} className="form-control" onChange={this.ChangePassword} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">تأكيد كلمة المرور </label>
                        <input type="password" value={this.state.confirmPassword} className="form-control" onChange={this.confirmPassword} required />
                    </div>


                    <input style={{ backgroundColor: "#141359" }} type="submit" value="التسجيل" className="btn btn-dark" />

                </form>
            </div>
        )
    }
}

export default Register;