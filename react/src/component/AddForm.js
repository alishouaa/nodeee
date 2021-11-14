import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faUser } from '@fortawesome/free-solid-svg-icons';

const AddForm = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (

        <div>
            <div className="form">
                <form onSubmit={props.addSubmit}>
                    <div className="mb-3">
                        <div className="pb-4">
                            <h5 className="d-inline" style={{ marginBottom: '1rem' }}> ?بماذا تفكّر</h5>
                            <input type="submit" className="btn btn-dark d-inline" style={{ float: "left", backgroundColor: "#141359" }} value="نشر" />
                        </div>

                        <input type="text" id="text" onChange={props.SaveText} className="form-control my-2" required placeholder="العنوان.." />
                        <textarea type="text" id="content" onChange={props.SaveContent} className="form-control my-2" required placeholder="المحتوى.." />
                        <div className="btn btn-success" onClick={toggle}>
                            <FontAwesomeIcon className="mx-2" icon={faPlus}>
                            </FontAwesomeIcon> إضافة صورة</div>
                        <Collapse isOpen={isOpen}>
                            <input class="form-control mt-2" id="inputGroupFile02" type="file" onChange={props.SaveImage} name="myImage" accept="image/*" />
                        </Collapse>

                    </div>
                </form>

            </div>
        </div>

    )


}

export default AddForm;