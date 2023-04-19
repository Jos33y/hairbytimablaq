import React, { useEffect, useRef, useState } from "react";
import {
    collection,
    deleteDoc,
    doc, getDoc,
    getDocs,
    limit,
    orderBy,
    query, 
    serverTimestamp, setDoc,
    updateDoc
} from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DashSpinner from "../../components/dash-spinner";
import HandleScroll from "../../components/go-top";
import { DashFormatDate } from "../../components/format-date";

const PaymentAccount = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [formContainer, setFormContainer] = useState(false)
    const [updatePayment, setUpdatePayment] = useState(false)
    const [paymentAccountId, setPaymentAccountId] = useState(null)
    const [paymentInfo, setPaymentInfo] = useState(null)
    const [paymentData, setPaymentData] = useState({
        accountName: '',
        accountNumber: '',
        bankName: '',
        timeStamp: '',
    })

    const MySwal = withReactContent(Swal)
    const { accountName, accountNumber, bankName } = paymentData;


    const handleFormContainer = (container_name) => {

        if (container_name === 'form-container') { 
            setFormContainer(true);
            setUpdatePayment(false);
            setPaymentData((prevState) => ({
                ...prevState,
                accountName: '',
                accountNumber: '',
                bankName: '',
            }))

        }
        else if (container_name === 'view-list') {
            setFormContainer(false);
            setUpdatePayment(false);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const rand_id = uuidv4().slice(0, 5)

        try {
            if (updatePayment) {
                const paymentDataCopy = { ...paymentData }
                paymentDataCopy.updateTime = serverTimestamp();
                const paymentUpdateRef = doc(db, 'payment_accounts', paymentAccountId)
                await updateDoc(paymentUpdateRef, paymentDataCopy)

                toast.success("bank account updated")
            }
            else {
                let gen_payment_unique_id = `${(bankName).replace(/,?\s+/g, '-')}-${rand_id}`
                let payment_unique_id = gen_payment_unique_id.toLowerCase();

                const paymentDataCopy = { ...paymentData }
                paymentDataCopy.payment_account_id = payment_unique_id;
                paymentDataCopy.timeStamp = serverTimestamp();
                const accountRef = doc(db, 'payment_accounts', payment_unique_id)
                await setDoc(accountRef, paymentDataCopy).then(() => {
                    setPaymentData((prevState) => ({
                        ...prevState,
                        accountName: '',
                        accountNumber: '',
                        bankName: '',
                    }))
                })

                toast.success("bank account added");
            }

        } catch (error) {
            console.log({ error })
            toast.error("Error adding bank account")
        }
        setIsDisabled(false)
        fetchPaymentAccounts().then();
        setFormContainer(false);
    }


    const fetchPaymentAccounts = async () => {

        setLoading(true);
        try {
            // const auth = getAuth()
            const payRef = collection(db, 'payment_accounts')
            const q = query(payRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let paymentInfo = [];

            querySnap.forEach((doc) => {
                return paymentInfo.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setPaymentInfo(paymentInfo)
            // console.log("payment info: ", paymentInfo)

        }
        catch (error) {
            toast.error("could not fetch payment accounts")
            console.log({ error })
        }
        setLoading(false)
    }



    const getPaymentDetails = async (payment_account_id) => {
        setLoading(true);

        try {
            const paymentRef = doc(db, 'payment_accounts', payment_account_id)
            const paymentSnap = await getDoc(paymentRef)

            if (paymentSnap.exists()) {
                setPaymentData(paymentSnap.data())
            }
        }
        catch (error) {
            console.log({ error })
        }
        setLoading(false);
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

        if (e.target.id) {
            let newValue = e.target.value;
            if (e.target.id === 'accountNumber') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
            }
            else {

                newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters

            }
            setPaymentData((prevState) => ({
                ...prevState,
                [e.target.id]: newValue,
            }));
        }

    }




    const onDelete = async (payment_account_id) => {

        try {
            MySwal.fire({
                title: 'Do you want to delete this payment account?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const payRef = doc(db, 'payment_accounts', payment_account_id)
                    await deleteDoc(payRef)
                    Swal.fire(
                        'Deleted!',
                        'Payment account has been deleted.',
                        'success'
                    )
                }

            }).then(() => {
                fetchPaymentAccounts().then()

            })

        }
        catch (error) {
            console.log({ error })
        }

    }



    const onEdit = async (payment_account_id) => {
        try {
            getPaymentDetails(payment_account_id).then();
            setPaymentAccountId(payment_account_id);
            // console.log("payment Edit ID", payment_account_id)
            setFormContainer(true);
            setUpdatePayment(true);
        }
        catch (error) {
            console.log({ error })
        }
    }


    useEffect(() => {

        if (isMounted) {

            fetchPaymentAccounts().then();
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
                                <div className="col-md-8">

                                    {formContainer ? (
                                        // form container
                                        <div className="add-category">
                                            <div className="form-container">
                                                <div className="form-header">

                                                    <p className="title">
                                                        {updatePayment ? ('Update Payment Account') : ('Add Payment Account')}
                                                    </p>
                                                    <button onClick={() => { handleFormContainer('view-list') }} className="btn btn-primary">View Accounts</button>
                                                </div>

                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label className="form-label">Account Name </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="John Doe"
                                                            id="accountName"
                                                            value={accountName}
                                                            onChange={onChange}
                                                            onKeyDown={handleAlphaKeyDown}
                                                            required={true} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="form-label">Account Number </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="accountNumber"
                                                            value={accountNumber}
                                                            onChange={onChange}
                                                            onKeyDown={handleNumKeyDown}
                                                            placeholder="0123456789"
                                                            required={true} />
                                                    </div>


                                                    <div className="form-group">
                                                        <label className="form-label">Bank Name </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="bankName"
                                                            value={bankName}
                                                            onChange={onChange}
                                                            onKeyDown={handleAlphaKeyDown}
                                                            placeholder="First Bank Nigeria"
                                                            required={true} />
                                                    </div>



                                                    <div className="form-group form-button">
                                                        <button disabled={isDisabled} type="submit" className="btn btn-primary">
                                                            {updatePayment ? ('Update Account') : ('Save Account')}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    ) : (

                                        // view list
                                        <div className="view-category">
                                            <div className="form-container">
                                                <div className="form-header">
                                                    <p className="title">Payment Accounts</p>
                                                    <button onClick={() => { handleFormContainer('form-container') }} className="btn btn-primary">Add Payment</button>
                                                </div>

                                                <div className="payment-list">
                                                    <hr />

                                                    {paymentInfo && paymentInfo.length > 0 ? (
                                                        <>
                                                            {paymentInfo.map((payment_account) => (
                                                                <div key={payment_account.id} className="payment-list-box">
                                                                    <div className="payment-list-details">
                                                                        <p className="date">{DashFormatDate(payment_account.data.timeStamp.toDate())} </p>
                                                                        <p className="name">{payment_account.data.accountName} </p>
                                                                        <p className="name">{payment_account.data.accountNumber} </p>
                                                                        <p className="name">{payment_account.data.bankName}</p>
                                                                    </div>
                                                                    <div className="payment-list-buttons">
                                                                        <p> <button onClick={() => { onEdit(payment_account.id).then() }} className="btn btn-md btn-primary">Edit </button> </p>
                                                                        <p> <button onClick={() => { onDelete(payment_account.id).then() }} className="btn btn-md btn-danger">Delete </button> </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <div className="empty-box">
                                                            <h3>No Payment Account Added</h3>
                                                        </div>

                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                    </>
                )
            }
        </>
    )
}

export default PaymentAccount;