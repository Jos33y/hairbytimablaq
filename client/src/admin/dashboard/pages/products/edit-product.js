import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import AddImages from "../../assets/images/add-image.png";
import { toast } from "react-toastify";
import DashSpinner from "../../components/dash-spinner";
import HandleScroll from "../../components/go-top"; 

const EditProductPage = () => {

    const location = useLocation();
    const isMounted = useRef()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [isDisabled, setDisabled] = useState(false)
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(null)
    let fileArray = [];
    let fileObj = [];
    const [formData, setFormData] = useState({
        productName: '',
        productCategory: '',
        productPrice: '',
        productDiscountPrice: '',
        discountOffer: false,
        productDescription: '',
        productStocks: '',
        images: {},
        timeStamp: '',
    })

    const {
        productName,
        productCategory,
        productPrice,
        productDiscountPrice,
        discountOffer,
        productDescription,
        productStocks,
        images,
    } = formData



    const manageProducts = () => {

        navigate("/admin/dashboard/product/manage")
    }




    const onSubmit = async (e) => {

        e.preventDefault()
        setDisabled(true)
        try {

            if (!image) {
                toast.error('Add product image');
            }
            else {

                if (formData.imgUrls[0] !== image[0]) {
                    const imgUrls = await Promise.all(
                        [...images].map((image) => storeImage(image))
                    ).catch(() => {
                        toast.error('Images not uploaded ')
                        return
                    })
                    const formDataCopy = {
                        ...formData,
                        imgUrls,
                        timeStamp: serverTimestamp(),
                    }
                    delete formDataCopy.images
                    const prodRef = doc(db, 'products', location.state.prod_id)
                    await updateDoc(prodRef, formDataCopy)
                }
                else {
                    const formDataCopy = {
                        ...formData,
                        timeStamp: serverTimestamp(),
                    }
                    delete formDataCopy.images
                    const prodRef = doc(db, 'products', location.state.prod_id)
                    await updateDoc(prodRef, formDataCopy)
                }

                toast.success('product updated successfully')
                navigate("/admin/dashboard/product/manage")
            }

            

        }
        catch (error) {
            console.log({ error })
            toast.error("unable to upload product")
        }
        setDisabled(false)
        // setLoading(false)
    }


    //store image in firebase storage
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const fileName = `hairbytimablaq-${image.name}-${uuidv4()}`

            const storageRef = ref(storage, `products/` + fileName)
            const uploadTask = uploadBytesResumable(storageRef, image)
 
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                        default:
                            console.log('Default Case')
                            break
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }




    const getProduct = async () => {
        setLoading(true)
        try {
            const productRef = doc(db, 'products', location.state.prod_id)
            const productSnap = await getDoc(productRef)

            if (productSnap.exists()) {
                setFormData(productSnap.data())
                for (let i = 0; i < (productSnap.data().imgUrls).length; i++) {
                    fileArray.push(productSnap.data().imgUrls[i])
                }
                setImage(fileArray)
            }
        }
        catch (error) {
            console.log({ error })
        }
        setLoading(false)
    }

    const fetchCategories = async () => {
        setLoading(true);

        try {
            // const auth = getAuth()
            const catRef = collection(db, 'categories')
            const q = query(catRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let categories = [];

            querySnap.forEach((doc) => {
                return categories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            if (categories === null) {
                toast.success("create cateogory first");
                navigate("/admin/dashboard/categories")
            }
            else {
                setCategories(categories)
            }

            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({ error })
        }
        setLoading(false)
    }


    const handleNumKeyDown = (e) => {
        const allowedKeys = ['Backspace'];
        if (e.ctrlKey && (e.key === 'c' || e.key === 'C' || e.key === 'v' || e.key === 'V' || e.key === 'a' || e.key === 'A')) {
            // Allow copy and paste shortcuts
            return;
        } else if (!allowedKeys.includes(e.key) && !/^[0-9]*$/.test(e.key)) {
            // Prevent any other keys that are not numeric
            e.preventDefault();
        }
    };

    const handleAlphaKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9\s]*$/.test(e.key)) {
            e.preventDefault();
        }
    };

    const onChange = (e) => {

        let boolean = null
        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }


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

        //Text/Numbers/booleans
        if (!e.target.files) {
            let newValue = e.target.value;

            if (e.target.id === 'productPrice' || e.target.id === 'productDiscountPrice' || e.target.id === 'productStocks') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
            }
            else if (e.target.id === 'productName') {
                newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters
            }
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? newValue,
            }))
        }
    }

    useEffect(() => {

        if (isMounted) {
            getProduct().then()
            fetchCategories().then()
            // console.log("Product ID for Edit:", location.state.prod_id);
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, location.state.prod_id])

    return (
        <>
            {loading ?
                (<DashSpinner />) : (
                    <>
                        <HandleScroll />
                        <div id="category-container" className="category-container">
                            <div className="row justify-content-center">
                                <div className="col-md-10">
                                    <div className="add-category">
                                        <div className="form-container">
                                            <div className="form-header">
                                                <p className="title">Add Product</p>
                                                <button onClick={manageProducts} className="btn btn-primary">View Products</button>
                                            </div>

                                            <form onSubmit={onSubmit}>
                                                <div className="form-group">
                                                    <label className="form-label">Product Name </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="productName"
                                                        value={productName}
                                                        onChange={onChange}
                                                        onKeyDown={handleAlphaKeyDown}
                                                        maxLength={100}
                                                        placeholder="Bone Straight 90 Inches"
                                                        required={true} />
                                                </div>

                                                <div className="form-group">
                                                    <label className="form-label">Product Description </label>
                                                    <textarea className="form-control"
                                                        id="productDescription"
                                                        rows="4"
                                                        cols="10"
                                                        onChange={onChange}
                                                        maxLength={2000}
                                                        value={productDescription}
                                                        placeholder="Quality 90 Inches Bone Straight"
                                                        required={true}></textarea>
                                                </div>


                                                <div className="form-group form-discount">
                                                    <div className="row">

                                                        <div className="col-md-3">
                                                            <label htmlFor="discountOffer" className="form-label">Discount Offer </label>
                                                            <select
                                                                id='discountOffer'
                                                                required={true}
                                                                defaultValue={discountOffer}
                                                                onChange={onChange}
                                                                className='form-control'
                                                                placeholder='Discount Offer ?'>

                                                                <option value='disable' disabled={true}>
                                                                    Select YES if product has discount offer...
                                                                </option>
                                                                <option value='true'>YES</option>
                                                                <option value='false'>NO</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <label htmlFor="product-price" className="form-label">Product Price (&#393;)  </label>
                                                            <input type="text"
                                                                id="productPrice"
                                                                className="form-control"
                                                                placeholder="10000 in &#393;"
                                                                value={productPrice}
                                                                onChange={onChange}
                                                                onKeyDown={handleNumKeyDown}
                                                                required={true} />
                                                        </div>

                                                        {discountOffer && (
                                                            <div className="col-md-4">
                                                                <label htmlFor="product-discount-price" className="form-label">Discount Price (&#393;)  </label>

                                                                <input type="text"
                                                                    id="productDiscountPrice"
                                                                    value={productDiscountPrice}
                                                                    onChange={onChange}
                                                                    onKeyDown={handleNumKeyDown}
                                                                    placeholder="5000 in &#393;"
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
                                                                id='productCategory'
                                                                value={productCategory}
                                                                onChange={onChange}
                                                                required={true} >
                                                                {categories.map((category) => (
                                                                    <option key={category.id}
                                                                        value={category.data.category_id}>{category.data.categoryName}
                                                                    </option>
                                                                ))}

                                                            </select>
                                                        </div>

                                                        <div className="col-md-6">
                                                            <label className="form-label">Product Stock </label>
                                                            <input type="text"
                                                                className="form-control"
                                                                required={true}
                                                                id="productStocks"
                                                                value={productStocks}
                                                                onKeyDown={handleNumKeyDown}
                                                                onChange={onChange}
                                                                placeholder="5" />
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
                                                                    multiple="3"
                                                                    max="3"
                                                                    hidden={true} />
                                                            </div>
                                                            {(image || []).slice(0, 3).map((url, index) => (
                                                                <div key={index} className="col-md-3 col-6">

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
                                                    <button type="submit" disabled={isDisabled} className="btn btn-primary"> Update Product </button>
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
        </>
    )
}

export default EditProductPage;