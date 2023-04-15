import TimaBlaq from "../../store/assets/images/timablaq.jpeg";

const AuthHeader = () => {
    return(
        <>
        <div className="auth-header">
            <div className="navbar-header">
            <img src={TimaBlaq} className="img-logo" alt="tima-blaq" />
                        Hair by Tima Blaq
            </div>
        </div>
        </>
    )
}

export default AuthHeader; 