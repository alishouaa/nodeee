import React from 'react';


const AddForm =  (props) => {


        return (
            <div className="form">
                <form onSubmit={props.addSubmit}>
                    <div className="mb-3">
                        <h2 className='title'>إضافة منشور</h2>
                        <label className="form-label">العنوان</label>
                        <input type="text" id="text" onChange={props.SaveText} className="form-control" required placeholder="العنوان.." />
                        <input type="file" id="file" className="mt-2" onChange={props.SaveImage}  name="myImage" accept="image/*" />
                        <br />
                        <input type="submit" className="btn btn-dark mt-4" value="اضافة منشور" />
                        <hr/>
                    </div>
                </form>

            </div>
        )
   

}

export default AddForm;