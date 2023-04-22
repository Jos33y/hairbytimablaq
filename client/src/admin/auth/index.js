import React, { useState } from "react";
import "./auth.css";
import AuthHeader from "./auth-header";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import FooterNav from "../../store/components/footer";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [disable, setDisable] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onSubmit = async (e) => {
        setDisable(true);
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            if (userCredential.user) {
                // check if user exist
                const docRef = doc(db, "admins", `${userCredential.user.uid}`);
                const docSnap = await getDoc(docRef);
                //if user doesnt exist

                if (docSnap.exists()) {
                    navigate("/admin/dashboard/home");
                } else {
                    toast.error("invalid login details");
                }
            }
        } catch (error) {
            console.log({ error });
            toast.error("Can't login user");
        }
        setDisable(false);
    };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    };

    return (
        <>
            <AuthHeader />
            <div className="admin-container">
                <div className="row justify-content-center">
                    {/* <div className="col-md-7">
                    <div className="auth-div">
                        <div className="auth-image">
                            <img src="" alt="auth explanation" className="img-fluid" />
                        </div>
                       
                    </div>
                </div> */}

                    <div className="col-md-5">
                        <div className="auth-form">
                            <form onSubmit={onSubmit} autoComplete="on">
                                <div className="form-header">
                                    <h5 className="title">Login your account </h5>
                                </div>
                                <div className="form-group">
                                    <label className="label-primary">Email </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={onChange}
                                        required={true}
                                        className="form-control"
                                        placeholder="Your Email Address"
                                        autoComplete="email"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label-primary">Password </label>
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={onChange}
                                        required={true}
                                        className="form-control"
                                        placeholder="Your Password"
                                        autoComplete="current-password"
                                    />
                                </div>

                                <div className="form-group">
                                    <button
                                        disabled={disable}
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Login
                                    </button>
                                </div>

                                <p className="p-create">

                                    {/* <Link className="link" to="/admin/register">
                                        Create Account
                                    </Link> */}
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <FooterNav />
        </>
    );
};

export default AdminLogin;
