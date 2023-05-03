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
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { db } from "../../../../firebase.config";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import DashSpinner from "../../components/dash-spinner";
import HandleScroll from "../../components/go-top";


const CategoriesPage = () => { 

    const isMounted = useRef()
    let fileArray;
    let fileObj;
    const [loading, setLoading] = useState(true)
    const [isDisabled, setIsDisabled] = useState(false)
    const [formContainer, setFormContainer] = useState(false)
    const [updateCategory, setUpdateCategory] = useState(false)
    const [categoryEditId, setCategoryEditId] = useState(null)
    const [categories, setCategories] = useState(null)
    const [image, setImage] = useState(null)
    const [categoryData, setCategoryData] = useState({
        categoryName: '',
        categoryDesc: '',
        categoryImage: '',
        timeStamp: '',
    })


    const MySwal = withReactContent(Swal)
    const { categoryName, categoryDesc, categoryImage } = categoryData;

    const handleFormContainer = (container_name) => {

        if (container_name === 'form-container') {
            setFormContainer(true);
            setUpdateCategory(false);
            setCategoryData((prevState) => ({
                ...prevState,
                categoryName: '',
                categoryDesc: '',
                categoryImage: '',
            }))
            setImage(null);

        }
        else if (container_name === 'view-list') {
            setFormContainer(false);
            setUpdateCategory(false);
            fetchCategories().then();
        }
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsDisabled(true)
        const rand_id = uuidv4().slice(0, 7)

        let imgUrl;
        try {

            if (updateCategory) {

                if (categoryImage === null || categoryImage === undefined) {
                    imgUrl = "";
                }
                else if (categoryImage === image) {
                    imgUrl = categoryImage;
                    console.log('image not changed', categoryImage)
                }
                else if (categoryImage !== image) {

                    const categoryImgUrl = await Promise.all(
                        [...categoryImage].map((image) => storeImage(image))
                    ).catch(() => {
                        // setLoading(false)
                        return
                    })
                    imgUrl = categoryImgUrl;
                    // console.log('image changed', categoryImage[0].name)
                }

                // console.log('image update', imgUrl)
                const categoryDataCopy = { ...categoryData }
                categoryDataCopy.categoryImage = `${imgUrl}`;;
                const categoryUpdateRef = doc(db, 'categories', categoryEditId)
                await updateDoc(categoryUpdateRef, categoryDataCopy)
                toast.success("category updated")

            } else {

                if (image === null || image === undefined) {
                    imgUrl = "";
                    // console.log('image not selected', imgUrl)
                }
                else {
                    const categoryImgUrl = await Promise.all(
                        [...categoryImage].map((image) => storeImage(image))
                    ).catch(() => {
                        // setLoading(false)
                        toast.error('Image file too large')
                        return
                    })
                    imgUrl = categoryImgUrl;
                    // console.log('image new', `${imgUrl}`);
                }


                let gen_category_unique_id = `${(categoryName).replace(/,?\s+/g, '-')}-${rand_id}`
                let cat_unique_id = gen_category_unique_id.toLowerCase();
 
                const categoryDataCopy = { ...categoryData }
                categoryDataCopy.category_id = cat_unique_id;
                categoryDataCopy.categoryImage = `${imgUrl}`;
                categoryDataCopy.timeStamp = serverTimestamp();
                const categoryRef = doc(db, 'categories', cat_unique_id)
                await setDoc(categoryRef, categoryDataCopy).then(() => {
                    setCategoryData((prevState) => ({
                        ...prevState,
                        categoryName: '',
                        categoryDesc: '',
                        categoryImage: '',
                    }))
                })

                toast.success("category created successfully")

            }
        } catch (error) {
            console.log({ error })
            toast.error("Error in creating category")
        }

        setIsDisabled(false)
        setFormContainer(false);
        fetchCategories().then()

    }



    //store image in firebase storage
    
    const storeImage = async (image) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage()
            const fileName = `hairbytimablaq-${image.name}-${uuidv4()}`

            const storageRef = ref(storage, `categoryImages/` + fileName)

            const uploadTask = uploadBytesResumable(storageRef, image)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    console.log('Upload is ' + progress + '% done')
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused')
                            break
                        case 'running':
                            console.log('Upload is running')
                            break
                        default:
                            console.log('Default Case')
                            break
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                    reject(error)
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    })
                }
            )
        })
    }

    const fetchCategories = async () => {

        setLoading(true);
        try { 
            // const auth = getAuth()
            const catRef = collection(db, 'categories')
            const q = query(catRef, orderBy('timeStamp', 'desc'), limit(10))
            const querySnap = await getDocs(q)

            let categories = [];

            querySnap.forEach((doc) => {
                return categories.push({
                    id: doc.id,
                    data: doc.data(),
                })
            })
            setCategories(categories)
            // console.log("categories info: ", categories)

        }
        catch (error) {
            toast.error("could not fetch categories")
            console.log({ error })
        }
        setLoading(false)
    }

    const getCategoryDetails = async (category_id) => {
        setLoading(true);

        try {
            const categoryRef = doc(db, 'categories', category_id)
            const categorySnap = await getDoc(categoryRef)

            if (categorySnap.exists()) {
                setCategoryData(categorySnap.data())
                setImage(categorySnap.data().categoryImage);
                console.log(categorySnap.data().categoryImage);
            }
        }
        catch (error) {
            console.log({ error })
        }
        setLoading(false);
    }



    const handleAlphaKeyDown = (e) => {
        const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!allowedKeys.includes(e.key) && !/^[a-zA-Z0-9\s]*$/.test(e.key)) {
            e.preventDefault();
        }
    };


    const onChange = (e) => {

        if (e.target.files) {
            setCategoryData((prevState) => ({
                ...prevState,
                categoryImage: e.target.files,
            }))
            fileObj = e.target.files;
            fileArray = URL.createObjectURL(fileObj[0]);
            setImage(fileArray)
        }

        let newValue = e.target.value;
        newValue = newValue.replace(/[^a-zA-Z0-9\s]/g, ''); // Remove any non-alphanumeric characters

        setCategoryData((prevState) => ({
            ...prevState,
            [e.target.id]: newValue,
        }));
    }


    const onDelete = async (category_id) => {

        try {
            MySwal.fire({
                title: 'Do you want to delete this category?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {

                    const payRef = doc(db, 'categories', category_id)
                    await deleteDoc(payRef)
                    Swal.fire(
                        'Deleted!',
                        'Category has been deleted.',
                        'success'
                    )
                }

            }).then(() => {
                fetchCategories().then()

            })

        }
        catch (error) {
            console.log({ error })
        }

    }


    const onEdit = async (category_id) => {
        try {
            getCategoryDetails(category_id).then();
            setCategoryEditId(category_id);
            // console.log("payment Edit ID", payment_account_id)
            setFormContainer(true);
            setUpdateCategory(true);
        }
        catch (error) {
            console.log({ error })
        }
    }


    useEffect(() => {

        if (isMounted) {

            fetchCategories().then();
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
                                                        {updateCategory ? ('Update Category') : ('Create category')}
                                                    </p>

                                                    <button onClick={() => { handleFormContainer('view-list') }} className="btn btn-primary">View Categories</button>
                                                </div>

                                                <form onSubmit={onSubmit}>
                                                    <div className="form-group">
                                                        <label className="form-label">Category Name </label>
                                                        <input type="text"
                                                            id="categoryName"
                                                            className="form-control"
                                                            value={categoryName}
                                                            onChange={onChange}
                                                            onKeyDown={handleAlphaKeyDown}
                                                            maxLength={30}
                                                            placeholder="Bone Straight"
                                                            required={true} />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="form-label">Category Description </label>
                                                        <textarea className="form-control"
                                                            id="categoryDesc"
                                                            rows="5"
                                                            cols="10"
                                                            placeholder="Quality Bone straight"
                                                            value={categoryDesc}
                                                            onChange={onChange}
                                                            onKeyDown={handleAlphaKeyDown}
                                                            maxLength={200}
                                                            required={true}></textarea>
                                                    </div>


                                                    <div className="form-group image-placeholder">
                                                        <label className="form-label">Category Image </label>
                                                        <label htmlFor="upload-cover-photo">
                                                            <div className="placeholder-container">
                                                                <img src={`${image ? (image) : (categoryImage ? (categoryImage) : ('https://placehold.jp/340x340.png'))}`} alt="" className="img-fluid" />
                                                            </div>
                                                        </label>
                                                        <input type="file"
                                                            id="upload-cover-photo"
                                                            accept='image/*'
                                                            hidden={true}
                                                            onChange={onChange}
                                                            className="form-control" />
                                                    </div>

                                                    <div className="form-group form-button">
                                                        <button disabled={isDisabled} className="btn btn-primary">
                                                            {updateCategory ? ('Update') : ('Save')}
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
                                                    <p className="title">Product Categories</p>
                                                    <button onClick={() => { handleFormContainer('form-container') }} className="btn btn-primary">Add Category</button>
                                                </div>

                                                <div className="category-list">

                                                    {categories && categories.length > 0 ? (
                                                        <>
                                                            {categories.map((category) => (
                                                                <div key={category.id} className="cat-list-box">
                                                                    <div className="cat-list-info">
                                                                        <div className="cat-list-img">
                                                                            <img src={`${category.data.categoryImage ? (`${category.data.categoryImage}`) : 'https://placehold.jp/70x70.png'}`} alt="" className="img-fluid" />
                                                                        </div>
                                                                        <div className="cat-list-details">
                                                                            <p className="name">{category.data.categoryName} </p>
                                                                            <p className="description">{category.data.categoryDesc}</p>
                                                                        </div>

                                                                    </div>
                                                                    <div className="cat-list-buttons">
                                                                        <p> <button onClick={() => { onEdit(category.id).then() }} className="btn btn-md btn-primary">Edit </button> </p>
                                                                        <p> <button onClick={() => { onDelete(category.id).then() }} className="btn btn-md btn-danger">Delete </button> </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <div className="empty-box">
                                                            <h3>No Categories Added</h3>
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

export default CategoriesPage;