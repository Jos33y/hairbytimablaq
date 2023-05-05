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
import he from 'he';

const RateSettings = () => {

    const isMounted = useRef()
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [formContainer, setFormContainer] = useState(false)
    const [updateRate, setUpdateRate] = useState(false)
    const [rateId, setRateId] = useState(null)
    const [rateInfo, setRateInfo] = useState(null)
    const [rateData, setRateData] = useState({
        rateSymbol: '&#36;',
        rateCurrency: 'usd',
        rateAmount: '0',
        currencyName: 'dollar',
        timeStamp: '',
    })

    // &#393; &#393;

    const MySwal = withReactContent(Swal)
    const { rateCurrency, rateAmount, currencyName } = rateData;


    const handleFormContainer = (container_name) => {

        if (container_name === 'form-container') {
            setFormContainer(true);
            setUpdateRate(false);
            setRateData((prevState) => ({
                ...prevState,
                rateSymbol: '&#36;',
                rateCurrency: 'usd',
                rateAmount: '0',
                currencyName: 'dollar',
            }))

        }
        else if (container_name === 'view-list') {
            setFormContainer(false);
            setUpdateRate(false);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const rand_id = uuidv4().slice(0, 5)

        try {
            if (updateRate) {
                const rateDataCopy = {...rateData}
                rateDataCopy.timeStamp = serverTimestamp();
                const rateUpdateRef = doc(db, 'exchange_rates', rateId)
                await updateDoc(rateUpdateRef, rateDataCopy)

                toast.success("exchange rate updated")
            }
            else {
                let gen_rate_unique_id = `${(currencyName).replace(/,?\s+/g, '-')}-${rand_id}`
                let rate_unique_id = gen_rate_unique_id.toLowerCase();

                const rateDataCopy = { ...rateData }
                rateDataCopy.rate_id = rate_unique_id;
                rateDataCopy.timeStamp = serverTimestamp();
                const accountRef = doc(db, 'exchange_rates', rate_unique_id)
                await setDoc(accountRef, rateDataCopy).then(() => {
                    setRateData((prevState) => ({
                        ...prevState,
                        rateSymbol: '&#36;',
                        rateCurrency: 'usd',
                        rateAmount: '0',
                        currencyName: 'dollar',
                    }))
                })

                toast.success("exchange rate added");
            }

        } catch (error) {
            console.log({ error })
            toast.error("Error adding exchange rate")
        }
        setIsDisabled(false)
        fetchRates().then();
        setFormContainer(false);
    }


    const fetchRates = async () => {
        setLoading(true);
        try {
            // const auth = getAuth()
            const rateRef = collection(db, 'exchange_rates')
            const q = query(rateRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let rateInfo = [];

            querySnap.forEach((doc) => {
                return rateInfo.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setRateInfo(rateInfo)
            // console.log("rate info: ", rateInfo)

        }
        catch (error) {
            toast.error("could not fetch exchange rates")
            console.log({ error })
        }
        setLoading(false)
    }



    const getRateDetails = async (rate_id) => {
        setLoading(true);

        try {
            const rateRef = doc(db, 'exchange_rates', rate_id)
            const rateSnap = await getDoc(rateRef)

            if (rateSnap.exists()) {
                setRateData(rateSnap.data())
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
        } else if (!allowedKeys.includes(e.key) && !/^[0-9.]*$/.test(e.key)) {
            // Prevent any other keys that are not numeric or the dot character
            e.preventDefault();
        }
    };
    




    const onChange = (e) => {

        if (e.target.id) {
            let newValue = e.target.value;
            if (e.target.id === 'rateAmount') {
                newValue = newValue.replace(/[^0-9.]/g, ''); // Remove any non-numeric or dot characters
            }
            
            else if (e.target.id === 'rateCurrency') {
                    if(newValue === 'usd') {
                        setRateData((prevState) => ({
                            ...prevState,
                            rateSymbol: "&#36;",
                            currencyName: "dollar",
                        }));
                    } else if (newValue === 'gmd') {
                        setRateData((prevState) => ({
                            ...prevState,
                            rateSymbol: "&#393;",
                            currencyName: "dalasi",
                        }))

                    } else if (newValue === 'ngn') {
                        setRateData((prevState) => ({
                            ...prevState,
                            rateSymbol: "&#8358;",
                            currencyName: "naira",
                        }));
                       
                    }
                   
            }
            else {

                newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters

            }
            setRateData((prevState) => ({
                ...prevState,
                [e.target.id]: newValue,
            }));
        }

    }




    const onDelete = async (rate_id) => {

        try {
            MySwal.fire({
                title: 'Do you want to delete this exchange rate?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const rateRef = doc(db, 'exchange_rates', rate_id)
                    await deleteDoc(rateRef)
                    Swal.fire(
                        'Deleted!',
                        'Current Exchange rate has been deleted.',
                        'success'
                    )
                }

            }).then(() => {
                fetchRates().then()

            })

        }
        catch (error) {
            console.log({ error })
        }

    }



    const onEdit = async (rate_id) => {
        try {
            getRateDetails(rate_id).then();
            setRateId(rate_id);
            // console.log("rate Edit ID", rate_id);
            setFormContainer(true);
            setUpdateRate(true);
        }
        catch (error) {
            console.log({ error })
        }
    }


    useEffect(() => {

        if (isMounted) {

            fetchRates().then();
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
                                                        {updateRate ? ('Update Exchange Rate ') : ('Add Exchange Rate')}
                                                    </p>
                                                    <button onClick={() => { handleFormContainer('view-list') }} className="btn btn-primary">View Rates</button>
                                                </div>

                                                <form onSubmit={handleSubmit}>
                                            

                                                    <div className="form-group">
                                                        <label className='form-label'>Rate Currency </label>
                                                        <select
                                                            value={rateCurrency}
                                                            name='rateCurrency'
                                                            onChange={onChange}
                                                            id='rateCurrency'
                                                            className='form-control'>
                                                            <option disabled>-- Select currency type--</option>
                                                            <option value="usd">US Dollar </option>
                                                            <option value="ngn">Nigeria Naira </option>
                                                            <option value="gmd">Gambia Dalasi </option>
                                                        </select>
                                                    </div>


                                                    <div className="form-group">
                                                        <label className="form-label">Rate in Dalasi</label>
                                                        <input type="text"
                                                            className="form-control"
                                                            placeholder="790 per dollar"
                                                            id="rateAmount"
                                                            value={rateAmount}
                                                            onChange={onChange}
                                                            onKeyDown={handleNumKeyDown}
                                                            required={true} />
                                                    </div>



                                                    <div className="form-group form-button">
                                                        <button disabled={isDisabled} type="submit" className="btn btn-primary">
                                                            {updateRate ? ('Update Rate') : ('Save Rate')}
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
                                                    <p className="title">Exchange Rates </p>
                                                    <button onClick={() => { handleFormContainer('form-container') }} className="btn btn-primary">Add Rate</button>
                                                </div>

                                                <div className="payment-list">
                                                    <hr />

                                                    {rateInfo && rateInfo.length > 0 ? (
                                                        <>
                                                            {rateInfo.map((rate) => (
                                                                <div key={rate.id} className="payment-list-box">
                                                                    <div className="payment-list-details">
                                                                        <p className="date">{DashFormatDate(rate.data.timeStamp.toDate())} </p>
                                                                        <p className="name rate">{`${rate.data.currencyName} ${he.decode(rate.data.rateSymbol)}`} </p>
                                                                        <p className="name">{rate.data.rateAmount} GMD </p>
                                                                    </div>
                                                                    <div className="payment-list-buttons">
                                                                        <p> <button onClick={() => { onEdit(rate.id).then() }} className="btn btn-md btn-primary">Edit </button> </p>
                                                                        <p> <button onClick={() => { onDelete(rate.id).then() }} className="btn btn-md btn-danger">Delete </button> </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <div className="empty-box">
                                                            <h3>No Exchange Rate Added</h3>
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

export default RateSettings;