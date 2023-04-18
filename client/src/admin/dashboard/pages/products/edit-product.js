import React, { useState } from "react";
import AddImages from "../../assets/images/add-image.png";

const EditProductPage = () => {

    const [image, setImage] = useState(null)
    let fileArray = [];
    let fileObj = [];
    const [formData, setFormData] = useState({
        discountOffer: false,
        images: {},
    })

    const {
        discountOffer,
        images,
    } = formData



    const onChange = (e) => {

        //Files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files,
            }))
            fileObj.push(e.target.files)
            for (let i = 0; i < fileObj[0].length; i++) {
                fileArray.push(URL.createObjectURL(fileObj[0][i]))
            }
            setImage(fileArray)
        }


    }


    

    return (
        <>
            <div className="category-container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="add-category">
                            <div className="form-container">
                                <div className="form-header">
                                    <p className="title">Edit Product</p>
                                    <button className="btn btn-primary">View Products</button>
                                </div>

                                <form>
                                    <div className="form-group">
                                        <label className="form-label">Product Name </label>
                                        <input type="text" className="form-control" placeholder="Bone Straight 90 Inches" required={true} />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Product Description </label>
                                        <textarea className="form-control" rows="4" cols="10" placeholder="Quality 90 Inches Bone Straight" required={true}></textarea>
                                    </div>


                                    <div className="form-group form-discount">
                                        <div className="row">

                                            <div className="col-md-3">
                                                <label htmlFor="discountOffer" className="form-label">Discount Offer </label>
                                                <select
                                                    id='discountOffer'
                                                    className='form-control'
                                                    placeholder='Discount Offer ?'>

                                                    <option value='disable' disabled={true} selected={true}>
                                                        Select YES if product has discount offer...
                                                    </option>
                                                    <option value='true'>YES</option>
                                                    <option value='false'>NO</option>
                                                </select>
                                            </div>
                                            <div className="col-md-4">
                                                <label htmlFor="product-price" className="form-label">Product Price (&#8358;)  </label>
                                                <input type="text"
                                                    className="form-control"
                                                    placeholder="10000 in GMD"
                                                    required={true}
                                                    id="productPrice" />
                                            </div>

                                            {discountOffer && (
                                                <div className="col-md-4">
                                                    <label htmlFor="product-discount-price" className="form-label">Product Discount Price (&#8358;)  </label>

                                                    <input type="text"
                                                        id="productDiscountPrice"
                                                        placeholder="5000 in GMD"
                                                        className="form-control" />
                                                </div>
                                            )}
                                        </div>

                                    </div>


                                    <div className="form-group">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label className="form-label">Product Category </label>
                                                <select name="category"
                                                    className="form-control"
                                                    required={true} >
                                                    <option value="uncategorized">Uncategorized</option>
                                                    <option value="null">Bone Straight</option>
                                                    <option value="null">Curly Weavon</option>

                                                </select>
                                            </div>

                                            <div className="col-md-6">
                                             <label className="form-label">Product Stock </label>
                                             <input type="number"
                                                    className="form-control"
                                                    placeholder="5"
                                                    required={true}
                                                    id="productStock" />
                                            </div>
                                        </div>

                                    </div>


                                    <div className="form-group">
                                        <label className="form-label">Product Images </label>
                                        <div className="Images-row">
                                            <div className="row">
                                                <div className="col-md-3 col-6">
                                                    <label htmlFor="upload-photo-one" className="card card-thumb">
                                                        <div style={{ margin: "auto" }} className="text-center">
                                                            <img src={AddImages} alt="products " className="img-fluid" />
                                                        </div>
                                                        <h5 className="card-title">select images</h5>
                                                    </label>
                                                    <input type="file"
                                                        className="form-control"
                                                        id="upload-photo-one"
                                                        onChange={onChange}
                                                        accept='image/*'
                                                        multiple
                                                        max={3}
                                                        required={true}
                                                        hidden={true} />
                                                </div>
                                                {(image || []).map(url => (
                                                    <div className="col-md-3 col-6">

                                                        <div className="card card-thumb">
                                                            <img
                                                                src={url}
                                                                alt="products"
                                                                className="card-img-top" />
                                                        </div>

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="form-group form-button">
                                        <button className="btn btn-primary"> Update Product </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProductPage;