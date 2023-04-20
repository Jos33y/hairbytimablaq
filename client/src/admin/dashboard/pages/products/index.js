import React, { useEffect, useRef, useState } from "react";
import { collection, getDocs, limit, orderBy, query, where, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HandleScroll from "../../components/go-top";
import DashSpinner from "../../components/dash-spinner";
import ProductBox from "./product-box";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const ProductListPage = () => {

    const MySwal = withReactContent(Swal)
    const navigate = useNavigate()
    const isMounted = useRef()
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [catValue, setCatValue] = useState('all');

    const newProduct = () => {

        navigate("/admin/dashboard/product/add")
    }

    const fetchProducts = async (changeCat) => {
        setLoading(true)
        let catChange = changeCat ? changeCat : catValue;
        try {
            const prodRef = collection(db, 'products')
            let q;
            if (catChange === 'all') {
                q = query(prodRef, orderBy('timeStamp', 'desc'),)
            }
            else {
                q = query(prodRef, where("productCategory", "==", `${catChange}`))

            }
            const querySnap = await getDocs(q)
            let products = []

            querySnap.forEach((doc) => {
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)
        }
        catch (error) {
            console.log({ error })
            toast.error("Unable to retrieve products")

        }
        setLoading(false);


    }


    const fetchCategories = async () => {

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
            setCategories(categories)
            // setLoading(false)
        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({ error })
        }
        setLoading(false)

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
                fetchProducts().then()
            })

        }
        catch (error) {
            console.log({ error })
        }

    }


    const onChange = (e) => {

        fetchProducts(e.target.value).then()
        setCatValue(e.target.value);

    }

    useEffect(() => {
        if (isMounted) {

            fetchProducts().then()
            fetchCategories().then()

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
                            <div className="row justify-content-center">
                                <div className="col-md-12">
                                    <div className="manage-product">
                                        <div className="form-container">
                                            <div className="form-header">
                                                <p className="title">Manage Products</p>
                                                <button onClick={newProduct} className="btn btn-primary">New Product</button>
                                            </div>

                                            <hr />

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <input className="form-control" type="text" placeholder="Search products..." />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-2">

                                                    </div>
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <select className="form-control"
                                                                defaultValue={catValue}
                                                                onChange={onChange}
                                                                id='productCategory'>
                                                                <option value='all'>All Products</option>
                                                                {categories.map((category) => (
                                                                    <option key={category.id}
                                                                        value={category.data.category_id}>{category.data.categoryName}
                                                                    </option>
                                                                ))}

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="product-list">
                                                <div className="row">
                                                    {products && products.length > 0 ? (
                                                        <>

                                                            {products.map((product) => (
                                                                <div key={product.id} className="col-md-6">
                                                                    <ProductBox product={product.data} id={product.id} onDelete={() => {onDelete(product.id).then()}} />
                                                                </div>
                                                            ))}


                                                        </>
                                                    ) : (
                                                        <div className="empty-box">
                                                            <h3>No Products Here</h3>
                                                        </div>

                                                    )}

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

export default ProductListPage;