import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';


class Login extends Component {


    render() {
        return (
            <div className="container-fluid p-0  header ">
                <div className="row m-0 ">
                    <div className="col-md-5 login">
                        <div className="text-center fauser pb-5 ">
                            <span className="rounded-circle"><FontAwesomeIcon className="mx-2" icon={faUser}>
                            </FontAwesomeIcon></span>
                            <br />
                            <h2 className="pt-5" style={{ color: "white" }}>تسجيل الدخول </h2>

                        </div>
                        <form className="form-submit" onSubmit={this.props.onSubmit}>
                            <div className="error" >{this.props.error}</div>

                            <div className="mb-3 mx-4">
                                <label style={{ color: "white" }} className="form-label">البريد الالكتروني</label>
                                <input type="email" required value={this.props.email} className="form-control" onChange={this.props.ChangeEmail} />
                            </div>
                            <div className="mb-3 mx-4">
                                <label style={{ color: "white" }} className="form-label">كلمة المرور</label>
                                <input type="password" required value={this.props.password} className="form-control" onChange={this.props.ChangePassword} />
                            </div>
                            <div className="mx-4">
                                <input style={{ backgroundColor: "#ff9700" }} type="submit" value="التسجيل" className="btn btn-dark" />
                            </div>
                            <div className="mx-4 responsive">
                                <p> اهلا و سهلا بكم في موقع وجه الكتاب إذا كان لديك حساب سابق
                                    قم بتسجيل الدخول من خلال إدخال المحتوى الموجود أو اضغط على   <span><Link to="/register"><FontAwesomeIcon className="mx-2" icon={faPlus}>
                                    </FontAwesomeIcon>إنشاء حساب جديد</Link></span>
                                </p>
                            </div>


                        </form>
                    </div>
                    <div className="col-md-7 ground">
                        <h1 className="text-center py-3">وجه الكتاب</h1>
                        <p> اهلا و سهلا بكم في موقع وجه الكتاب إذا كان لديك حساب سابق
                            قم بتسجيل الدخول من خلال إدخال المحتوى الموجود أو اضغط على   <span><Link to="/register"><FontAwesomeIcon className="mx-2" icon={faPlus}>
                            </FontAwesomeIcon>إنشاء حساب جديد</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;