import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const FormPages = (props) => {
    const [comm, setComm] = useState(false);

    const handleCloseLi = () => setComm(false);
    const handleShowLi = () => setComm(true);


    return (

        <div>
            <Button className="m-3 btn-responsive"  onClick={handleShowLi}>
                <h5 className="d-sm-block p-2 d-md-inline p-md-5">   <FontAwesomeIcon className="mx-2" icon={faPlus}>
                </FontAwesomeIcon>إنشاء صفحة</h5>
            </Button>
            <Modal  show={comm} size="lg" onHide={handleCloseLi}>
                <Modal.Body className="p-3">
                    <div className="row p-0 m-0">
                        <form onSubmit={props.onNewPage}>
                            <div className="mb-3">
                                <label className="form-label">اسم الصفحة</label>
                                <input type="text" value={props.name} className="form-control" onChange={props.ChangeName} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">الصنف</label>
                                <select class="form-select" value={props.categories} onChange={props.ChangeCategories} aria-label="Default select example">
                                    <option value="لم يحدد" selected>اختر الصنف</option>
                                    <option value="رياضية">رياضية</option>
                                    <option value="اجتماعية">اجتماعية</option>
                                    <option value="أخبارية">أخبارية</option>
                                    <option value="مشاهير">مشاهير</option>
                                    <option value="موسيقى  ">موسيقى  </option>

                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">اضافة صورة للصفحة </label>
                                <input required class="form-control mt-2" id="inputGroupFile02" type="file" onChange={props.ChangeImage} name="myImage" accept="image/*" />
                            </div>
                            <div className="mb-3">
                                <input type="submit" value="إنشاء" className="btn btn-dark" />
                            </div>
                        </form>
                    </div>

                </Modal.Body>
            </Modal>

        </div>

    )


}

export default FormPages;