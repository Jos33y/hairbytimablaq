import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, limit, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import "./details.css";
import RelatedProducts from "./related";
import DetailsBreadCrumb from "./breadcrumb";
import FooterNav from "../components/footer";
import HeaderNav from "../components/header";
import PageLoading from "../components/loading";
import { toast } from "react-toastify";
import { useCart } from "../components/cart-context";

const ProductDetails = () => {

    const params = useParams()
    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [disabled, setDisabled] = useState(false)
    const [products, setProducts] = useState(null)
    const [product, setProduct] = useState(null)
    const [cart, setCart] = useCart();
    const [category, setCategory] = useState(null)
    const [mainImage, setMainImage] = useState(null)
    const [quantity, setQuantity] = useState(1);


    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        // console.log("quanty", quantity);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };



    //add to cart function


    const addToCart = async (product) => {

        setDisabled(true)
        try {
            let cartData = [...cart]
            //look for item in cart array

            const existingItem = cartData.find((cartItem) => cartItem.product_id === product.product_id);

            //if item already exists 
            if (existingItem) {
                toast.error('item already added') //alert user
            } else {
                const cartItem = {
                    ...product,
                    productPrice: product.discountOffer ? product.productDiscountPrice : product.productPrice,
                    qty: quantity,
                };
                cartData.push(cartItem);
                //  setCart(cartData);
                setCart(cartData);
                localStorage.setItem('cart', JSON.stringify(cartData));
                toast.success('Product added to cart');
            }
        }
        catch (error) {
            console.log({ error })
        }

        setDisabled(false)

    }


    //Fetch Product Catgory
    const fetchCategory = async (prod_cat) => {

        try {
            const docRef = doc(db, 'categories', prod_cat)
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

    }


    //Fetch Product Details
    const fetchProductDetails = async () => {

        setLoading(true)
        try {
            const docRef = doc(db, 'products', params.prod_id)
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProduct(docSnap.data())
                fetchCategory(docSnap.data().productCategory)
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

    //Fetch Product
    const fetchProducts = async () => {
        setLoading(true)
        try {
            const prodRef = collection(db, 'products')
            const q = query(prodRef, limit(4))
            const querySnap = await getDocs(q)
            let products = []
            querySnap.forEach((doc) => {
                return products.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setProducts(products)

        } catch (error) {
            console.log({ error })
            toast.error("Unable to retrieve products")
        }
        setLoading(false);
    }


    useEffect(() => {
        if (isMounted) {

            fetchProductDetails().then()
            fetchProducts().then()
            

        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted, params.prod_id])
 



    return (
        <>
            {loading ?
                (<PageLoading />) : (
                    <>

                        <HeaderNav />
                        <div className="product-details-container">
                            {/* product details breadcrumb section */}

                            <DetailsBreadCrumb cat_name={category ? category.categoryName : ''} prod_name={product ? product.productName : ''} />

                            {/* product details section */}
                            <div className="details-section">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="product-images">
                                            <div className="row">
                                                <div className="col-2">

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
                                                <div className="col-10">
                                                    <div className="prod-main-img">
                                                        {/* link to enlarge image on click => https://stackblitz.com/edit/lightgallery-react?file=index.tsx */}
                                                        <img src={`${mainImage}`} alt="prod main img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="details-sect-info">
                                            <p className="prod-name">{product.productName}</p>
                                            {product.discountOffer ? (
                                                <p className="prod-price"> &#8358; {product.productDiscountPrice.toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    <span className="discount-price">
                                                        &#8358; {product.productPrice.toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    </span>
                                                </p>

                                            )
                                                :
                                                (
                                                    <p className="prod-price"> &#8358; {product.productPrice.toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                                                )}
                                            <p className="prod-stock">
                                                {product.productStocks > 0 ? ('In stock') : ('Out of stock')}
                                            </p>
                                            <div className="prod-cart">
                                                <div className="prod-quantity">
                                                    <div className="form-group">
                                                        <button onClick={handleDecrement} className="btn btn-sm btn-outline">
                                                            <i className="fa-solid fa-minus"></i>
                                                        </button>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            readOnly={true}
                                                            value={quantity}
                                                            maxLength="3"
                                                        />
                                                        <button onClick={handleIncrement} className="btn btn-sm btn-outline">
                                                            <i className="fa-solid fa-plus"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="add-cart">
                                                    <button disabled={disabled} onClick={() => addToCart(product)} className="btn btn-md btn-primary">
                                                        {disabled ? 'Adding to cart...' : 'Add to cart'}
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="prod-description">
                                                <p className="p-title">Description</p>
                                                <p className="p-desc">
                                                    {product.productDescription}
                                                </p>
                                            </div>

                                            <div className="details-prod-tags">
                                                <p className="prod-tags">
                                                    Categories: <span className="tag-list">
                                                        {category ? category.categoryName : ''}
                                                    </span>
                                                </p>
                                                <p className="prod-tags">
                                                    Tag:
                                                    {product.productTags.map((tag, index) => (
                                                        <span key={index} className="tag-list">
                                                            {tag}
                                                        </span>
                                                    ))}

                                                </p>
                                            </div>

                                            <div className="share-icons">
                                                <ul>
                                                    <li>
                                                        <p type="button" className="share-link"> <i className="fa-brands fa-square-pinterest"></i> </p>
                                                    </li>


                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr />
                            <RelatedProducts  products={products} />
                        </div>
                        <FooterNav />

                    </>)}
        </>
    );
};

export default ProductDetails;
