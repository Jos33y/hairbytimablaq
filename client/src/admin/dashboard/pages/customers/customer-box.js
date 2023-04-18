import UserProfile from "../../assets/images/default-user.png";

const CustomerBox = () => {

    return (
        <>
            <div className="customer-box">
                <div className="customer-info">
                    <div className="customer-img">
                        <img src={UserProfile} alt="customer" className="img-fluid" />
                    </div>
                    <div className="customer-details">
                        <p className="name">Joshua Kingston</p>
                        <p className="email"> kingstonjosh@gmail.com  </p>
                        <p className="email"> 08098765432 </p>
                    </div>

                </div>
                <div className="customer-status">
                    <p className="date"> 3-4-2023 </p>
                    <p> <button className="btn btn-md active">Active </button> </p>
                </div>
            </div>
        </>
    )
}

export default CustomerBox;