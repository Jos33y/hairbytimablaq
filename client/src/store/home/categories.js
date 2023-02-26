import CatImgOne from "../assets/images/elegant-bare.jpg";
import CatImgTwo from "../assets/images/portrait-pleasan.jpg";
import CatImgThree from "../assets/images/black-woman.jpg";
import CatImgFour from "../assets/images/portrait-attractive.jpg";

const HomeCategories = () => {
    return (
        <>
        <div className="home-categories">
            <h4 className="title">Hair Collections</h4>

            <div className="row">

                <div className="col-lg-3 col-md-4 col-6">
                    <div className="categories-box">
                        <div className="categories-img">
                            <img src={CatImgOne} alt="" className="img-fluid" />
                        </div>
                        <div className="categories-title">
                            <button className="btn btn-md btn-secondary"> Water Curly </button>
                        </div>
                    </div>
                </div>


                <div className="col-lg-3 col-md-4 col-6">
                    <div className="categories-box">
                        <div className="categories-img">
                            <img src={CatImgTwo} alt="" className="img-fluid" />
                        </div>
                        <div className="categories-title">
                            <button className="btn btn-md btn-secondary"> Bouncy / Wavy </button>
                        </div>
                    </div>
                </div>


                <div className="col-lg-3 col-md-4 col-6">
                    <div className="categories-box">
                        <div className="categories-img">
                            <img src={CatImgThree} alt="" className="img-fluid" />
                        </div>
                        <div className="categories-title">
                            <button className="btn btn-md btn-secondary"> Straight </button>
                        </div>
                    </div>
                </div>


                <div className="col-lg-3 col-md-4 col-6">
                    <div className="categories-box">
                        <div className="categories-img">
                            <img src={CatImgFour} alt="" className="img-fluid" />
                        </div>
                        <div className="categories-title">
                            <button className="btn btn-md btn-secondary"> Layered </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default HomeCategories