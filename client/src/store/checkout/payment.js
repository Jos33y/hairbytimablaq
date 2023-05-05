import React, { useEffect, useRef, useState } from "react";
import "./checkout.css";
import { doc, getDoc, collection, query, where, getDocs, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import CheckoutBreadCrumb from './breadcrumb';
import { useNavigate, useLocation } from 'react-router-dom';
import HeaderNav from '../components/header';
import FooterNav from '../components/footer';
import CheckOutOrderSummary from './order-summary';
import PageLoading from "../components/loading";
import { formatPrice, formatSymbol } from "../components/format-price";
import { toast } from "react-toastify";
import { useCart } from "../components/cart-context";

const CheckOutPayment = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const isMounted = useRef()
    let fileArray;
    let fileObj;
    const [cart, setCart] = useCart();
    const [carts, setCarts] = useState([...cart])
    const itemsPrice = carts.reduce((a, c) => a + c.productPrice * c.qty, 0);
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [contactEmail, setContactEmail] = useState("");
    // eslint-disable-next-line
    const [contactPhone, setContactPhone] = useState();
    const [customerId, setCustomerId] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("bank transfer")
    const [accountData, setAccountData] = useState(null)
    const [orderId, setOrderId] = useState(null)
    const [shippingMethod, setShippingMethod] = useState("");
    const [shippingData, setShippingData] = useState(null);
    const [paymentMade, setPaymentMade] = useState(false);
    const [deliveryData, setDeliveryData] = useState(null)
    const [receipt, setReceipt] = useState(null)

    const [paymentData, setPaymentData] = useState({
        customerName: '',
        customerBank: '',
        amountPaid: '',
        paymentReceipt: '',
        paymentStatus: 'processing',
        paymentMethod: '',
        bankName: '',
        accountName: '',
        accountNumber: '',
        orderId: '',
        timeStamp: '',
    })
    const { customerName, customerBank, paymentReceipt } = paymentData;


    const madePayment = () => {

        setPaymentMade(true);
    }

    const confirmPayment = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const rand_id = uuidv4().slice(0, 10)
        let receiptUrl;

        try {

            if (receipt === null || receipt === undefined) {
                toast.error("no transaction receipt found")
            }
            else {
                const paymentReceiptUrl = await Promise.all(
                    [...paymentReceipt].map((receipt) => storeReceipt(receipt))
                ).catch(() => {
                    // setLoading(false)
                    toast.error('file too large')

                    return
                })
                receiptUrl = paymentReceiptUrl;
                // console.log('image new', `${imgUrl}`);

                let gen_payment_id = `trans-${rand_id}`
                let payment_id = gen_payment_id.toLowerCase();
                const paymentDataCopy = { ...paymentData }
                paymentDataCopy.payment_id = payment_id;
                paymentDataCopy.amountPaid = (Number(deliveryData.deliveryPrice) + Number(itemsPrice));
                paymentDataCopy.paymentReceipt = `${receiptUrl}`;
                paymentDataCopy.accountName = accountData.accountName;
                paymentDataCopy.accountNumber = accountData.accountNumber;
                paymentDataCopy.bankName = accountData.bankName;
                paymentDataCopy.paymentMethod = paymentMethod;
                paymentDataCopy.orderId = orderId;
                paymentDataCopy.timeStamp = serverTimestamp();

                const paymemtRef = doc(db, 'transactions', payment_id)
                await setDoc(paymemtRef, paymentDataCopy).then(() => {
                    updateOrder(payment_id);
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("unable to send payment");
        }
        setIsDisabled(false);
    }

    const storeReceipt = async (receipt) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const fileName = `trans-${receipt.name}-${uuidv4()}`

            const storageRef = ref(storage, `transactionReceipt/` + fileName)

            const uploadTask = uploadBytesResumable(storageRef, receipt)

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
                    console.log(error)
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

    const updateOrder = async (payment_id) => {
        const orderCopy = {}
        orderCopy.payment_id = payment_id;
        orderCopy.timeStamp = serverTimestamp();
        const orderRef = doc(db, 'orders', `${orderId}`)
        await updateDoc(orderRef, orderCopy).then(() => {
            sendConfirmationEmail(payment_id);
        })
    }



    const sendConfirmationEmail = async (payment_id) => {

        fetch('/order-placed', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: contactEmail,
                from: 'support@hairbytimablaq.com',
                subject: 'Order Placed!',
                order_id: orderId,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success('Order complete');
                    clearCart()
                    navigate('/checkout/confirmation',  { state: { order_id: orderId, payment_id: payment_id, customer_id: customerId, delivery_method: shippingMethod } })
                }
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const clearCart = () => {
        localStorage.removeItem("cart")
        localStorage.removeItem("order_id")
        let localCart = localStorage.getItem("cart");
        localCart = JSON.parse(localCart);
        if (localCart) {
            setCart(localCart)
        }
        else {
            setCart([]);
        }
    }
    
    const fetchCustomers = async () => {

        setLoading(true)

        const customersRef = doc(db, 'customers', location.state.customer_id)
        const customerSnap = await getDoc(customersRef)

        if (customerSnap.exists()) {
 
            if (customerSnap.data().shipping_id) {
                const shippingRef = doc(db, 'customers', location.state.customer_id, 'shipping', `${customerSnap.data().shipping_id}`)
                const shippingSnap = await getDoc(shippingRef)
                if (shippingSnap.exists()) {
                    // console.log("Shipping data", shippingSnap.data())
                    setShippingData(shippingSnap.data())
                    if (shippingSnap.data().contact_mode === 'email') {
                        setContactEmail(shippingSnap.data().contact_info)
                    }
                    else {
                        setContactPhone(shippingSnap.data().contact_info)
                    }
                }

            }
            setCustomerId(location.state.customer_id);
            setShippingMethod(location.state.delivery_method);
            setPaymentMethod(location.state.payment_method);
        }
        else {
            console.log('no customer data')
        }

        setLoading(false)

    }

    const fetchDelivery = async () => {
        const deliveryRef = doc(db, 'delivery_locations', location.state.delivery_method)
        const deliverySnap = await getDoc(deliveryRef)

        if (deliverySnap.exists()) {
            setDeliveryData(deliverySnap.data())
        }

    }

    const fetchAccount = async () => {
        try {


            const accountRef = collection(db, 'payment_accounts')
            let q;
            q = query(accountRef, where("accountType", "==", `${paymentMethod}`))

            const querySnap = await getDocs(q)
            let accountData = []
            querySnap.forEach((doc) => {
                return accountData.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })

            if (accountData.length > 0) {
                setAccountData(accountData[0].data)
                // console.log('payment data:', accountData[0].data)
            }

        } catch (error) {
            toast.error("error getting accounts")
        }

    }


    const goToShipping = () => {

        navigate('/checkout/shipping', { state: { customer_id: customerId, delivery_method: shippingMethod } })

    }


    const onChange = (e) => {
        if (e.target.files) {
            setPaymentData((prevState) => ({
                ...prevState,
                paymentReceipt: e.target.files,
            }))
            fileObj = e.target.files;
            fileArray = URL.createObjectURL(fileObj[0]);
            setReceipt(fileArray)
        }

        else {
            setPaymentData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))

        }
    }

    useEffect(() => {
        if (isMounted) {

            fetchCustomers().then();
            fetchDelivery().then();
            fetchAccount().then();
            let localCart = localStorage.getItem("cart");
            localCart = JSON.parse(localCart);
            if (localCart) {
                setCarts(localCart)
            } else {
                navigate('/cart')
            }

            let local_order_id = localStorage.getItem("order_id");
            local_order_id = JSON.parse(local_order_id);
            if (local_order_id) {
                setOrderId(local_order_id)
            }
        }
        return () => {
            isMounted.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    return (
        <>
            {loading ?
                (<PageLoading />) : (
                    <>
                        <HeaderNav />
                        <div className="checkout-container">
                            <CheckoutBreadCrumb page="payment" />

                            <div className='checkout-section'>
                                <div className='row'>
                                    <div className='col-md-7'>
                                        <div className='checkout-table'>
                                            <div className='checkout-table-info'>
                                                <div className='checkout-info'>
                                                    <p className='title'>Full  Name</p>
                                                    <p className='sub-title'> {`${shippingData.last_name} ${shippingData.first_name}`} </p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Contact Info</p>
                                                    <p className='sub-title'> {shippingData.contact_info}</p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Call Number</p>
                                                    <p className='sub-title'>  {shippingData.delivery_phone}</p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Ship To</p>
                                                    <p className='sub-title'> {`${shippingData.delivery_address}, ${shippingData.city}, ${shippingData.delivery_state}, ${shippingData.country}. `}</p>
                                                </div>
                                                <hr />
                                                <div className='checkout-info'>
                                                    <p className='title'>Deliver Method</p>
                                                    <p className='sub-title'>  {deliveryData.deliveryLocation} - {formatSymbol()}{formatPrice(deliveryData.deliveryPrice)} </p>
                                                </div>
                                                <hr />
                                                <div className='return-info'>
                                                    <p onClick={goToShipping} className='return-link'>Change Info </p>
                                                </div>
                                            </div>

                                        </div>



                                        <div className='checkout-table'>
                                            <div className='checkout-order-info'>
                                                <div className='order-info'>
                                                    <p className='title'>Sub total</p>
                                                    <p className='sub-title'> {formatSymbol()}{(formatPrice(itemsPrice))}</p>
                                                </div>
                                                <hr />
                                                <div className='order-info'>
                                                    <p className='title'>Shipping</p>
                                                    <p className='sub-title'>{formatSymbol()}{formatPrice(Number(deliveryData.deliveryPrice))}</p>
                                                </div>
                                                <hr />
                                                <div className='order-info'>
                                                    <p className='title total'>Total</p>
                                                    <p className='sub-title total'>  {formatSymbol()}{formatPrice(Number(deliveryData.deliveryPrice) + Number(itemsPrice))}</p>
                                                </div>

                                            </div>

                                        </div>

                                        <div className='payment-table'>
                                            <h4 className='title'>Make Payment</h4>
                                            <p className='note'>Make payment to the account below</p>
                                            <p className='sub-note'>Pay exact order amoumt for your order to be processed</p>

                                            <div className='account'>
                                                <div className='account-details'>
                                                    <p>Account Name:</p>
                                                    <p>Account Number:</p>
                                                    <p>Bank Name:</p>
                                                    <p className='amount'>Amount to Pay: </p>
                                                </div>
                                                <div className='account-info'>
                                                    <p>{accountData ? accountData.accountName : ''}</p>
                                                    <p>{accountData ? accountData.accountNumber : ''} </p>
                                                    <p>{accountData ? accountData.bankName : ''}</p>
                                                    <p className='amount'> {formatSymbol()}{formatPrice(Number(deliveryData.deliveryPrice) + Number(itemsPrice))}</p>
                                                </div>
                                            </div>

                                            {!paymentMade &&

                                                <div className='payment-button'>
                                                    <button onClick={madePayment} className='btn btn-secondary'>Payment Made</button>
                                                    <button onClick={goToShipping} className='btn btn-danger'>Cancel Order</button>
                                                </div>
                                            }

                                            {paymentMade &&
                                                <form onSubmit={confirmPayment}>
                                                    <div className='payment-made'>
                                                        <div className='form-group'>
                                                            <label className='form-label'>Account Name Paid From </label>
                                                            <input className='form-control'
                                                                type='text'
                                                                placeholder='Name on Account '
                                                                id='customerName'
                                                                value={customerName}
                                                                onChange={onChange}
                                                                required={true} />
                                                        </div>

                                                        <div className='form-group'>
                                                            <label className='form-label'>Bank Name Paid From </label>
                                                            <input className='form-control'
                                                                type='text'
                                                                placeholder='Bank Name '
                                                                id='customerBank'
                                                                value={customerBank}
                                                                onChange={onChange}
                                                                required={true} />
                                                        </div>

                                                        <div className='form-group'>
                                                            <label className='form-label'> Upload Transaction Receipt </label>
                                                            <input className='form-control' type='file'
                                                                id="paymentReceipt"
                                                                accept="image/*, application/pdf"
                                                                onChange={onChange}
                                                                required={true} />
                                                        </div>

                                                        <div className='form-group'>
                                                            <button disabled={isDisabled} type="submit" className='btn btn-success'>Confirm Payment</button>
                                                            <button onClick={goToShipping} className='btn btn-outline'>Cancel Order</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            }

                                        </div>

                                    </div>

                                    <div className='col-md-5'>
                                        <CheckOutOrderSummary shippingMethod={location.state.delivery_method} paymentPage={true} />
                                    </div>

                                </div>
                            </div>
                        </div>
                        <FooterNav />
                    </>)}
        </>
    );
}

export default CheckOutPayment; 