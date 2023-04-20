import { useNavigate } from "react-router-dom";
import CatImgOne from "../assets/images/elegant-bare.jpg";

const HomeCategories = ({ categories }) => {

    const navigate = useNavigate()
 
    const goToShop = (cat_id) => {

        navigate("/shop", { state: { category_id: cat_id } })
        console.log("category id:", cat_id);
    }


    return (
        <>
            <div className="home-categories">
                <h4 className="title">Hair Collections</h4>

                <div className="row">

                    {categories.map((category) => (
                        <div key={category.id} className="col-lg-3 col-md-4 col-6">
                            <div className="categories-box">
                                <div className="categories-img">
                                    <img src={category.data.categoryImage ? category.data.categoryImage || category.data.categoryImage[0] : CatImgOne} alt="category" className="img-fluid" />
                                </div>
                                <div className="categories-title">
                                    <button onClick={() => { goToShop(category.data.category_id) }} className="btn btn-md btn-secondary"> {category.data.categoryName} </button>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </>
    )
}

export default HomeCategories