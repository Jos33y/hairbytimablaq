import { useNavigate } from "react-router-dom";

const HomeHero = () => {

    const navigate = useNavigate();
    
    return (
        <>
            <div className="hero-container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="hero-content">
                            <p className="tag-one">In store and Online</p>
                            <h3 className="tag-two">Store Launch</h3>
                            <p className="tag-three">10% sale of everything </p>
                            <button onClick={() => {navigate('/shop')}} className="btn btn-md btn-primary">Shop Now</button>
                        </div>
                    </div>
                    <div className="col-md-6"></div>
                </div>
            </div>
        </>
    )
}

export default HomeHero;