import "./component.css";
import LoadingGif from "../assets/icons/shop-loading.gif";

const PageLoading = () => {
    return(
        <>
        <div className="page-loading">
            <div className="load-section">
                <img src={LoadingGif} alt="loading..." className="img-fluid" />
            </div>
          
        </div>
        </>
    )
}

export default PageLoading;