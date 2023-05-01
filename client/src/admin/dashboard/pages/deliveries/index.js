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


const DeliveryPage = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [formContainer, setFormContainer] = useState(false)
    const [updateDelivery, setUpdateDelivery] = useState(false)
    const [deliveryEditId, setDeliveryEditId] = useState(null)
    const [deliveryInfo, setDeliveryInfo] = useState(null)
    const [deliveryData, setDeliveryData] = useState({
        deliveryLocation: '',
        deliveryPrice: '',
        timeStamp: '',
    })

    const MySwal = withReactContent(Swal)
    const { deliveryLocation, deliveryPrice } = deliveryData;

    const handleFormContainer = (container_name) => {

        if (container_name === 'form-container') {
            setFormContainer(true);
            setUpdateDelivery(false);
            setDeliveryData((prevState) => ({
                ...prevState,
                deliveryLocation: '',
                deliveryPrice: '',
            }))

        }
        else if (container_name === 'view-list') {
            setFormContainer(false);
            setUpdateDelivery(false);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const rand_id = uuidv4().slice(0, 5)

        try {
            if (updateDelivery) {
                const deliveryDataCopy = { ...deliveryData }
                deliveryDataCopy.updateTime = serverTimestamp();
                const deliveryUpdateRef = doc(db, 'delivery_locations', deliveryEditId)
                await updateDoc(deliveryUpdateRef, deliveryDataCopy)

                toast.success("delivery location updated")
            }
            else {
                let gen_delivery_unique_id = `${(deliveryLocation).replace(/,?\s+/g, '-')}-${rand_id}`
                let delivery_unique_id = gen_delivery_unique_id.toLowerCase();

                const deliveryDataCopy = { ...deliveryData }
                deliveryDataCopy.delivery_id = delivery_unique_id;
                deliveryDataCopy.timeStamp = serverTimestamp();
                const deliveryRef = doc(db, 'delivery_locations', delivery_unique_id)
                await setDoc(deliveryRef, deliveryDataCopy).then(() => {
                    setDeliveryData((prevState) => ({
                        ...prevState,
                        deliveryLocation: '',
                        deliveryPrice: '',
                    }))
                })

                toast.success("delivery location added");
            }

        } catch (error) {
            console.log({ error })
            toast.error("Error adding delivery location")
        }
        setIsDisabled(false)
        fetchDeliveryList().then();
        setFormContainer(false);
    }


    const fetchDeliveryList = async () => {

        setLoading(true);
        try {
            // const auth = getAuth()
            const delRef = collection(db, 'delivery_locations')
            const q = query(delRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let deliveryInfo = [];

            querySnap.forEach((doc) => {
                return deliveryInfo.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setDeliveryInfo(deliveryInfo)
            console.log("delivery info: ", deliveryInfo)

        }
        catch (error) {
            // toast.error("could not fetch payment accounts")
            console.log({ error })
        }
        setLoading(false)
    }



    const getDeliveryDetails = async (delivery_id) => {
        setLoading(true);

        try {
            const deliveryRef = doc(db, 'delivery_locations', delivery_id)
            const deliverySnap = await getDoc(deliveryRef)

            if (deliverySnap.exists()) {
                setDeliveryData(deliverySnap.data())
            }
        }
        catch (error) {
            console.log({ error })
        }
        setLoading(false);
    }


    const onDelete = async (delivery_id) => {

        try {
            MySwal.fire({
                title: 'Do you want to delete this delivery location?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const payRef = doc(db, 'delivery_locations', delivery_id)
                    await deleteDoc(payRef)
                    Swal.fire(
                        'Deleted!',
                        'Delivery Location has been deleted.',
                        'success'
                    )
                }

            }).then(() => {
                fetchDeliveryList().then()

            })

        }
        catch (error) {
            console.log({ error })
        }

    }



    const onEdit = async (delivery_id) => {
        try {
            getDeliveryDetails(delivery_id).then();
            setDeliveryEditId(delivery_id);
            // console.log("payment Edit ID", payment_account_id)
            setFormContainer(true);
            setUpdateDelivery(true);
        }
        catch (error) {
            console.log({ error })
        }
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
            if (e.target.id === 'deliveryPrice') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
            }
            else {
                newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters
            }
            setDeliveryData((prevState) => ({
                ...prevState,
                [e.target.id]: newValue,
            }));
        }

    }


    useEffect(() => {

        if (isMounted) {

            fetchDeliveryList().then();
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
                                        <div className="add-location">
                                            <div className="form-container">
                                                <div className="form-header">
                                                    <p className="title">
                                                        {updateDelivery ? ('Update Delivery Location') : ('Add Delivery Location')}
                                                    </p>
                                                    <button onClick={() => { handleFormContainer('view-list') }} className="btn btn-primary">View Locations</button>
                                                </div>

                                                <form onSubmit={handleSubmit}>
                                                    <div className="form-group">
                                                        <label className="form-label">Delivery Location </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="deliveryLocation"
                                                            value={deliveryLocation}
                                                            onChange={onChange}
                                                            onKeyDown={handleAlphaKeyDown}
                                                            placeholder="Within Gambia"
                                                            required={true} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="form-label">Delivery Fee </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="2000 in GMD"
                                                            id="deliveryPrice"
                                                            value={deliveryPrice}
                                                            onChange={onChange}
                                                            onKeyDown={handleNumKeyDown}
                                                            required={true} />
                                                    </div>


                                                    <div className="form-group form-button">
                                                        <button disabled={isDisabled} type="submit" className="btn btn-primary">
                                                            {updateDelivery ? ('Update') : ('Save ')}
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
                                                    <p className="title">Delivery Locations</p>
                                                    <button onClick={() => { handleFormContainer('form-container') }} className="btn btn-primary">Add Location</button>
                                                </div>

                                                <div className="category-list">

                                                    {deliveryInfo && deliveryInfo.length > 0 ? (
                                                        <>
                                                            {deliveryInfo.map((delivery) => (
                                                                <div key={delivery.id} className="cat-list-box">
                                                                    <div className="cat-list-info">
                                                                        <div className="cat-list-details">
                                                                            <p className="location">{delivery.data.deliveryLocation}  </p>
                                                                            <p className="fee"> &#8358; {delivery.data.deliveryPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} </p> 
                                                                        </div>

                                                                    </div>
                                                                    <div className="cat-list-buttons">
                                                                        <p> <button onClick={() => { onEdit(delivery.id).then() }} className="btn btn-md btn-primary">Edit </button> </p>
                                                                        <p> <button onClick={() => { onDelete(delivery.id).then() }} className="btn btn-md btn-danger">Delete </button> </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <div className="empty-box">
                                                            <h3>No Delivery Location Added Added</h3>
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

export default DeliveryPage;