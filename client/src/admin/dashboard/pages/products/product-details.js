import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import "./details.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DashSpinner from "../../components/dash-spinner";
import HandleScroll from "../../components/go-top";

const ProductDetailsPage = () => {

    const location = useLocation(); 
    const isMounted = useRef() 
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState(null)
    const [category, setCategory] = useState(null)
    const [mainImage, setMainImage] = useState(null);

    const newProduct = () => {

        navigate("/admin/dashboard/product/add") 
    }

    const editProduct = () => {
        
        navigate("/admin/dashboard/product/edit", {state: {prod_id: location.state.prod_id}})
    }


    const onDelete = async (prod_id) => {

        try {
            MySwal.fire({
                title: 'Do you want to delete this product?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const prodRef = doc(db, 'products', prod_id)
                    await deleteDoc(prodRef)
                    // console.log("Product ID here:", prod_id);
                    Swal.fire(
                        'Deleted!',
                        'Product has been deleted.',
                        'success'
                    )
                }

            }).then(() => {

                navigate("/admin/dashboard/product/manage")
            })

        }
        catch (error) {
            console.log({ error })
        } 

    }


 
    //Fetch Product Details
    const fetchProductDetails = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, 'products', location.state.prod_id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct(docSnap.data())
                setMainImage(docSnap.data().imgUrls[0])

            } else {
                console.log("No Product here");
                //setLoading(false)
            }
        }
        catch (error) {
            console.log({ error })
        }

        setLoading(false)
    }

    //Fetch Product Details
    const fetchCategory = async () => {
        setLoading(true)
        try {
            const docRef = doc(db, 'categories', location.state.category_id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setCategory(docSnap.data())

            } else {
                console.log("No Category Found");
                //setLoading(false)
            }
        }
        catch (error) {
            console.log({ error })
        }

        setLoading(false)
    }


    useEffect(() => {
        if (isMounted) {

            fetchProductDetails().then()
            fetchCategory().then()

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    return (
        <>
            {loading ?
                (<DashSpinner />) : (
                    <>

                        <HandleScroll />
                        <div id="category-container" className="category-container">

                            <div className="manage-product">
                                <div className="details-container">
                                    <div className="form-header">
                                        <p className="title">Product Details</p>
                                        <button onClick={newProduct} className="btn btn-primary">New Product</button>
                                    </div>
                                    {/* product details section */}
                                    <div className="product-details">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="product-images">

                                                    <div className="prod-main-img">
                                                        {/* link to enlarge image on click => https://stackblitz.com/edit/lightgallery-react?file=index.tsx */}

                                                        <img src={`${mainImage}`} alt="prod main" className="img-fluid" />
                                                    </div>

                                                    <div className="prod-img-list">
                                                        <div onClick={() => { setMainImage(product.imgUrls[0]) }} className={`img-thumb ${mainImage === product.imgUrls[0] ? 'active' : ''}`}>
                                                            <img src={product.imgUrls[0] ? product.imgUrls[0] : product.imgUrls[0]} alt="prod thumbnail" className="img-fluid" />
                                                        </div>

                                                        {product.imgUrls[1] ? (
                                                            <div onClick={() => { setMainImage(product.imgUrls[1]) }} 
                                                            className={`img-thumb ${mainImage === product.imgUrls[1] ? 'active' : ''}`}>
                                                                <img src={product.imgUrls[1]} alt="prod thumbnail" className="img-fluid" />
                                                            </div>
                                                        ) : ('')}


                                                        {product.imgUrls[2] ? (
                                                            <div onClick={() => { setMainImage(product.imgUrls[2]) }} 
                                                            className={`img-thumb ${mainImage === product.imgUrls[2] ? 'active' : ''}`}>
                                                                <img src={product.imgUrls[2]} alt="prod thumbnail" className="img-fluid" />
                                                            </div>
                                                        ) : ('')}

                                                    </div>
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="details-sect-info">
                                                    <p className="prod-name">{product.productName}</p>

                                                    {product.discountOffer ? (
                                                        <p className="prod-price"> &#393; {product.productDiscountPrice.toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            <span className="discount-price">
                                                                &#393; {product.productPrice.toString()
                                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                            </span>
                                                        </p>

                                                    )
                                                        :
                                                        (
                                                            <p className="prod-price"> &#393; {product.productPrice.toString()
                                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                        )}


                                                    <p className="prod-stock">{product.productStocks} in stock</p>


                                                    <div className="prod-description">
                                                        <p className="p-title">Description</p>
                                                        <p className="p-desc">
                                                            {product.productDescription}
                                                        </p>
                                                    </div>

                                                    <div className="details-prod-tags">
                                                        <p className="prod-tags">
                                                            Category: <span className="tag-list">
                                                                {category ? category.categoryName : ''}
                                                            </span>
                                                        </p>
                                                        <p className="prod-tags">
                                                            Tag:
                                                            {product.productTags.map((tag) => (
                                                                <span className="tag-list">
                                                                    {tag}
                                                                </span>
                                                            ))}


                                                        </p>
                                                    </div>

                                                    <div className="action-buttons">
                                                        <button onClick={editProduct} className="btn btn-md btn-primary">Edit </button>
                                                        <button onClick={() => {onDelete(product.product_id).then()}} className="btn btn-md btn-danger">Delete </button>
                                                    </div>
                                                </div>
                                            </div>
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

export default ProductDetailsPage;