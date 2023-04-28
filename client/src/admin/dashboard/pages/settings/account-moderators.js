import React, { useEffect, useRef, useState } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { collection, getDocs, orderBy, query, doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../../../firebase.config";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DashSpinner from "../../components/dash-spinner";
import HandleScroll from "../../components/go-top";
import { DashFormatDate } from "../../components/format-date";

const AccountModerators = ({ userId }) => {

    const isMounted = useRef()
    const MySwal = withReactContent(Swal) 
    const [loading, setLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)
    const [formContainer, setFormContainer] = useState(false)
    const [moderators, setModerators] = useState(null)
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        adminRole: "Manager",
    });

    const { fullName, email, phoneNumber, adminRole } = formData;

    const handleFormContainer = (container_name) => {

        if (container_name === 'form-container') {
            setFormContainer(true);
        }
        else if (container_name === 'view-list') {
            setFormContainer(false);
        }
    }

    const onSubmit = async (e) => {
        setIsDisabled(true);
        e.preventDefault();

        try {
            let split_full_name = formData.fullName.split(' ')
            let first_name = split_full_name[0];
            let gen_password = 'hairbytimablaq@' + first_name;
            let password = gen_password.toLowerCase();


            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: fullName,
            });
            const formDataCopy = { ...formData };
            formDataCopy.timestamp = serverTimestamp();

            await setDoc(doc(db, 'admins', user.uid), formDataCopy).then(() => { })
            toast.success("moderator added successfully");

        } catch (error) {
            toast.error("couldn't add moderator");
            console.log({ error });
        }
        setIsDisabled(false);
    };


    const fetchModerators = async () => {
        setLoading(true);

        try {
            // const auth = getAuth()
            const modRef = collection(db, 'admins')
            const q = query(modRef, orderBy('timestamp', 'desc'))
            const querySnap = await getDocs(q)

            let moderators = [];

            querySnap.forEach((doc) => {
                return moderators.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setModerators(moderators)
            // console.log("Moderators info: ", moderators)

        }
        catch (error) {
            toast.error("could not fetch moderators")
            console.log({ error })
        }
        setLoading(false)
    }


    const onDelete = async (moderator_id) => {

        try {
            MySwal.fire({
                title: 'Do you want to delete this moderator?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    console.log(moderator_id)

                    if (moderator_id === userId) {
                        Swal.fire(
                            'Canceled!',
                            'Can not delete self.',
                            'error'
                        )
                    }
                    else {
                        Swal.fire(
                            'Deleted!',
                            'Moderator account has been deleted.',
                            'success'
                        )
                    }

                }

            }).then(() => {

                fetchModerators().then();
            })

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

    const handleEmailKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Control', 'c', 'v', 'a'];
        if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9@._-]*$/.test(e.key)) {
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

            if (e.target.id === 'phoneNumber') {
                newValue = newValue.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
            }

            if (e.target.id === 'fullName') {
                newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters
            }

            if (e.target.id === 'email') {
                newValue = newValue.replace(/[^a-zA-Z0-9@._\s-]/g, ''); // Remove any non-alphanumeric characters, spaces, and some special characters
            }

            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: newValue,
            }));
        }


    };


    useEffect(() => {

        if (isMounted) {

            fetchModerators().then();
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
                                                    <p className="title">Add Moderators</p>
                                                    <button onClick={() => { handleFormContainer('view-list') }}  className="btn btn-primary">View Moderators</button>
                                                </div>

                                                <form onSubmit={onSubmit}>
                                                    <div className="form-group">
                                                        <label className="form-label">Full Name </label>
                                                        <input type="text"
                                                            id="fullName"
                                                            value={fullName}
                                                            onChange={onChange}
                                                            onKeyDown={handleAlphaKeyDown}
                                                            required={true}
                                                            maxLength={100}
                                                            className="form-control"
                                                            autoComplete="full-name"
                                                            placeholder="John Doe" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="form-label">Email </label>
                                                        <input type="email"
                                                            id="email"
                                                            value={email}
                                                            onChange={onChange}
                                                            onKeyDown={handleEmailKeyDown}
                                                            className="form-control"
                                                            autoComplete="email"
                                                            placeholder="moderator@gmail.com"
                                                            required={true} />
                                                    </div>


                                                    <div className="form-group">
                                                        <label className="form-label">Phone Number </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            id="phoneNumber"
                                                            value={phoneNumber}
                                                            onChange={onChange}
                                                            onKeyDown={handleNumKeyDown}
                                                            autoComplete="phone-number"
                                                            placeholder="234700000000000"
                                                            required={true} />
                                                    </div>

                                                    <div className="form-group Account Role">
                                                        <select
                                                            id="adminRole"
                                                            defaultValue={adminRole}
                                                            onChange={onChange}
                                                            className="form-control">
                                                            <option value="Administrator">Administrator</option>
                                                            <option value="Manager">Manager</option>
                                                            <option value="Editor">Editor</option>
                                                        </select>
                                                    </div>


                                                    <div className="form-group form-button">
                                                        <button type="submit" disabled={isDisabled} className="btn btn-primary"> Save Moderator </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    ) : (

                                        // view list
                                        <div className="view-category">
                                            <div className="form-container">
                                                <div className="form-header">
                                                    <p className="title">Account Moderators</p>
                                                    <button onClick={() => { handleFormContainer('form-container') }}  className="btn btn-primary">Add Moderators</button>
                                                </div>

                                                <div className="payment-list">
                                                    <hr />

                                                    {moderators && moderators.length > 0 ? (
                                                        <>

                                                            {moderators.map((moderator) => (
                                                                <div key={moderator.id} className="payment-list-box">
                                                                    <div className="payment-list-details">

                                                                        <p className="date">{moderator.data.adminRole} </p>
                                                                        <p className="name">{moderator.data.fullName}  </p>
                                                                        <p className="name">{moderator.data.email}  </p>
                                                                        <p className="name">{moderator.data.phoneNumber} </p>
                                                                    </div>
                                                                    <div className="payment-list-buttons">
                                                                        <p className="date">{DashFormatDate(moderator.data.timestamp.toDate())} </p>
                                                                        <p> &nbsp; </p>
                                                                        <p> <button onClick={() => { onDelete(moderator.id).then() }} className="btn btn-md btn-danger">Delete </button> </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <div className="empty-box">
                                                            <h3>No Moderators Added</h3>
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

export default AccountModerators;