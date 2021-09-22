import React, { useState } from 'react';
import { Collapse } from 'reactstrap';


const AddForm = (props) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="form">
            <form onSubmit={props.addSubmit}>
                <div className="mb-3">
                    <button className='btn title ' onClick={toggle} style={{ marginBottom: '1rem' }}>إضافة منشور</button>
                    <Collapse isOpen={isOpen}>
                        <label className="form-label">العنوان</label>
                        <input type="text" id="text" onChange={props.SaveText} className="form-control my-2" required placeholder="العنوان.." />
                        <textarea type="text" id="content" onChange={props.SaveContent} className="form-control my-2" required placeholder="المحتوى.." />
                        <input type="file" id="file" className="mt-2" onChange={props.SaveImage} name="myImage" accept="image/*" />
                        <br />
                        <input type="submit" className="btn btn-dark mt-4" value="اضافة منشور" />
                        <hr />
                    </Collapse>

                </div>
            </form>

        </div>
    )


}

export default AddForm;