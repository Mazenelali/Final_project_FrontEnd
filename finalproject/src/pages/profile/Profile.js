import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import Loder from "../../component/loder/Loder";
import logo from "../../image/logo.png";
import { useNavigate } from "react-router-dom";
import { GrEdit } from "react-icons/gr";
import PostCard from "./postCard";
import MiniLoder from "../../component/Mini-loder/MiniLoder";
import swal from 'sweetalert2'
import Swal from "sweetalert2";

function Profile() {
    const id = localStorage.getItem("_id");
    const navigate = useNavigate();
    const [DataProfile, setDataProfile] = useState(null);
    const [DataUpdateById, setDataUpdateById] = useState()
    const [image, setImage] = useState()
    const [imageUpdate, setImageUpdate] = useState()

    const [DataProfileUpdate, setDataUpdate] = useState({
        first_name: "",
        last_name: "",
        class_title: "",
        description: "",
        location: "",
        number_phone: "",
        image: null,
        languages: "",
    });
    console.log( DataProfileUpdate)

    const [isCliked, setClicked] = useState(false);

    const [dataPost, setDataPost] = useState([]);

    const [addPost, setAddPost] = useState({
        title: "",
        description: "",
        location: "",
        availble_week: "",
        price: null,
        User_id: `${id}`,
    });

    const isclick = () => {
        setClicked(!isCliked);
    };

    const [ShowFormPost, setFromPost] = useState(false);

    const ShowForm = () => {
        setFromPost(!ShowFormPost);
    };


    const [ShowEditPost, setEditPost] = useState();

    const [IdUpdate, setIdUpdate] = useState(null)

    console.log(IdUpdate)

    const clearLocalStorage = () => {
        localStorage.clear();
        setTimeout(() => {
            navigate("/Homepage");
        }, 2000);
    };



    const getDataProfile = () => {
        const role = localStorage.getItem("role");
        const id = localStorage.getItem("_id");

        if (role === "tutor") {
            axios
                .get(`${process.env.REACT_APP_URL}/User/${id}`)
                .then((response) => {
                    setDataProfile(response.data);
                    setDataUpdate({
                        first_name: response.data[0].first_name,
                        last_name: response.data[0].last_name,
                        class_title: response.data[0].class_title,
                        description: response.data[0].description,
                        location: response.data[0].location,
                        number_phone: response.data[0].number_phone,
                        image: response.data[0].image,
                        languages: response.data[0].languages,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .get(`${process.env.REACT_APP_URL}/Student/getStudent/${id}`)
                .then((response) => {
                    console.log(response);
                    setDataProfile(response.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    useEffect(() => {
        getDataProfile();
        getDataPost();
    }, []);

    const handelChageDataUpdate = (e) => {
        const value = e.target.value;
        setDataUpdate({
            ...DataProfileUpdate,
            [e.target.name]: value,
        });
    };
    const SubmitEditProfile = () => {
        const formData = new FormData();
        formData.append("image", imageUpdate);
        axios.post('https://api.imgbb.com/1/upload?key=1d88a70f2899ea43e3ea29a52cfadddb', formData).then((res) => {
            const data = { ...DataProfileUpdate, image: res.data.data.url }
            axios
                .patch(
                    `${process.env.REACT_APP_URL}/User/${localStorage.getItem("_id")}`,
                    data
                )
                .then((response) => {
                    console.log(response);
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        iconColor:"#FF673D",
                        title: 'Profile updated successfully'
                      })
                    getDataProfile()
                })
                .catch((err) => {
                    console.log(err);
                });

        }).catch((err) => {
            console.log(err)
        })
    };

    const getDataPost = () => {
        axios
            .get(`${process.env.REACT_APP_URL}/post/`)
            .then((response) => {
                const ID = localStorage.getItem("_id");
                const filterData = response.data.filter((ele) => {
                    const find = ele.User_id[0]._id.includes(ID);
                    return find;
                });
                setDataPost(filterData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handelChagePost = (e) => {
        const value = e.target.value;
        setAddPost({
            ...addPost,
            [e.target.name]: value,
        });
    };


    const submitPost = () => {
        const formdata = new FormData();
        formdata.append("image", image);
        axios.post("https://api.imgbb.com/1/upload?key=1d88a70f2899ea43e3ea29a52cfadddb", formdata).then(res => {
            const data = addPost
            console.log(res)
            data.image = res.data.data.image.url

            axios
                .post(`${process.env.REACT_APP_URL}/post/`, data)
                .then((response) => {
                    console.log(response);
                    ShowForm()
                    getDataPost()

                })
                .catch((err) => {
                    console.log(err);
                });
        }
        ).catch(err => { console.log(err) })

    };
    console.log(addPost)

    const [EditDataPost, setEditDataPost] = useState()

    const handelEditPost = (e) => {
        const value = e.target.value;
        setEditDataPost({
            ...EditDataPost,
            [e.target.name]: value,
        });
    };


    console.log(EditDataPost)
    const submitEditPost = () => {
        const formdata = new FormData();
        formdata.append("image", imageUpdate);
        axios.post("https://api.imgbb.com/1/upload?key=1d88a70f2899ea43e3ea29a52cfadddb", formdata).then((res) => {
            console.log(res)
            const data = { ...EditDataPost, image: res.data.data.url }

            axios
                .patch(`${process.env.REACT_APP_URL}/post/${IdUpdate}`, data)
                .then((response) => {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.addEventListener('mouseenter', Swal.stopTimer)
                          toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                      })
                      
                      Toast.fire({
                        icon: 'success',
                        iconColor:"#FF673D",
                        title: 'Post updated successfully'
                      })
                    getDataPost()
                })
                .catch((err) => {
                    console.log(err);
                });
        }).catch((err) => {
            console.log(err)
        })

    };

    const [ShowPopUpEmail, setPopUpEmail] = useState(false)

    const [dataSecurity, setDataSecurity] = useState({
        email: "",
        password: ""
    })

    const handelEditEmail = (e) => {
        const value = e.target.value;
        setDataSecurity({
            ...dataSecurity,
            [e.target.name]: value,
        });
    };
    const [messageEmail, setMessageEmail] = useState()
    const submitEditemail = () => {

        const ID = localStorage.getItem('_id')
        if (!dataSecurity.email || !dataSecurity.password){
            Swal.fire({
                title: ' Please enter correct email and password',
                icon:'warning',
                confirmButtonColor :"#FCDC5B" , 
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              
        }else{

        axios
            .patch(`${process.env.REACT_APP_URL}/User/${ID}`, dataSecurity)
            .then((response) => {
                console.log(response);
                setMessageEmail(response.data.message)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    };
    console.log(dataSecurity)


    return (
        <>

            <div className="Shape-button">
            </div>
            <div className="profile-container">

                {!DataProfile ? (
                    <div style={{height:"100vh" , width :"100%" , display:'flex' , justifyContent:'center' , alignItems :'center'}}> <MiniLoder/></div>
                ) : (
                    <div className="profile">
                        <div className="flex-profile">
                            <div className="Shape">
                                <div className="image-profile">
                                    <img
                                        src={
                                            !DataProfile
                                                ? logo
                                                : `${DataProfile[0].image}`
                                        }
                                        alt=""
                                    />
                                </div>
                            </div>
                            <div className="personal-info">
                                <div className="profile-title_heading">

                                    <h2>
                                        {isCliked === false ? (
                                            `${DataProfile[0].first_name} ${DataProfile[0].last_name}`
                                        ) : (
                                            <>
                                                {" "}
                                                <input
                                                    type="text"
                                                    defaultValue={
                                                        DataProfile[0].first_name
                                                    }
                                                    name="first_name"
                                                    onChange={handelChageDataUpdate}
                                                />{" "}
                                                <input
                                                    type="tex"
                                                    defaultValue={
                                                        DataProfile[0].last_name
                                                    }
                                                    name="last_name"
                                                    onChange={handelChageDataUpdate}
                                                />{" "}
                                            </>
                                        )}
                                    </h2>{" "}
                                    <button onClick={isclick}>
                                        <GrEdit />
                                    </button>
                                </div>
                                <div className="each-info">
                                    <p className="Class-title">
                                        <span>Class Title : </span>
                                        {isCliked === false ? (
                                            DataProfile[0].class_title
                                        ) : (
                                            <input
                                                type="tex"
                                                defaultValue={
                                                    DataProfile[0].class_title
                                                }
                                                name="class_title"
                                                onChange={handelChageDataUpdate}
                                            />
                                        )}
                                    </p>
                                    <p className="description-profile">
                                        <span>Description about yourself : </span>
                                        {isCliked === false ? (
                                            DataProfile[0].description
                                        ) : (
                                            <input
                                                type="tex"
                                                defaultValue={
                                                    DataProfile[0].description
                                                }
                                                name="description"
                                                onChange={handelChageDataUpdate}
                                            />
                                        )}
                                    </p>
                                    <p className="Languages">
                                        <span>Languages : </span>
                                        {isCliked === false ? (
                                            DataProfile[0].languages
                                        ) : (
                                            <input
                                                type="tex"
                                                defaultValue={DataProfile[0].languages}
                                                name="languages"
                                                onChange={handelChageDataUpdate}
                                            />
                                        )}
                                    </p>
                                    <p className="Location">
                                        <span>Location : </span>
                                        {isCliked === false ? (
                                            DataProfile[0].location
                                        ) : (
                                            <input
                                                type="tex"
                                                defaultValue={DataProfile[0].location}
                                                name="location"
                                                onChange={handelChageDataUpdate}
                                            />
                                        )}
                                    </p>
                                    <p className="Number Phone">
                                        <span>Number phone : </span>
                                        {isCliked === false ? (
                                            DataProfile[0].number_phone
                                        ) : (
                                            <input
                                                type="tex"
                                                defaultValue={
                                                    DataProfile[0].number_phone
                                                }
                                                name="number_phone"
                                                onChange={handelChageDataUpdate}
                                            />
                                        )}
                                    </p>
                                    {isCliked && (
                                        <p>
                                            {" "}
                                            <span>image :</span>{" "}
                                            <input
                                                type="file"
                                                name="image"
                                                onChange={(e) => {
                                                    setImageUpdate(
                                                        e.target.files[0],
                                                    );
                                                }}
                                            />{" "}
                                            <button className="submit-edit-profile" onClick={SubmitEditProfile}>
                                                {" "}
                                                Edit{" "}
                                            </button>
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: '10px' }}>
                            <span style={{ borderBottom: "1px solid black" }} onClick={() => setPopUpEmail(true)}> change Password</span>
                            {/* <span style={{borderBottom : "1px solid black"}}
                            onClick={()=>{
                                const ID = localStorage.getItem('_id')
                                axios.delete(`${URL}/User/${ID}`).then(()=>{
                                    localStorage.clear()
                                    navigate('/homePage')
                                })
                            }}
                            > Delete your account </span> */}
                            <div className="logout" 
                            onClick={() => {
                                console.log("hello from logout");
                                clearLocalStorage();
                            }}>
                                <span>
                                    <button>
                                        Logout
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div className="add_new_post">
                            <h2> Your post</h2>
                            <button  onClick={ShowForm}>
                                <span>+ </span>Add post
                            </button>
                        </div>
                        <div className="post_cards">
                            {!dataPost
                                ? "wait !!"
                                : dataPost.map((ele) => {
                                    return (
                                        <PostCard
                                            key={dataPost.indexOf(ele)}
                                            _id={ele._id}
                                            title={ele.title}
                                            description={ele.description}
                                            location={ele.location}
                                            start_date_end_date={
                                                ele.availble_week
                                            }
                                            price={ele.price}
                                            image={ele.image}
                                            showEditForm={setEditPost}
                                            IdOfPost={setIdUpdate}
                                            setDataUpdateById={setDataUpdateById}
                                            getPosts={getDataPost}
                                            setEditDataPost={setEditDataPost}
                                        />
                                    );
                                })}
                        </div>
                        {ShowFormPost && (
                            <div className="Post-PopUp">
                                <section className="section_form">
                                    <div className="action-post">
                                        <h2>Add post</h2>
                                        <button onClick={ShowForm}>X</button>
                                    </div>
                                    <div
                                        id="consultation-form"
                                        className="feed-form"
                                    >
                                        <input
                                            name="title"
                                            required=""
                                            placeholder="Title"
                                            type="text"
                                            onChange={handelChagePost}
                                        />
                                        <input
                                            name="description"
                                            type="text"
                                            required=""
                                            placeholder="Description"
                                            onChange={handelChagePost}
                                        />
                                        <input
                                            name="location"
                                            type="text"
                                            required=""
                                            placeholder="Location"
                                            onChange={handelChagePost}
                                        />
                                        <input
                                            name="availble_week"
                                            type="text"
                                            required=""
                                            placeholder="Start date end date"
                                            onChange={handelChagePost}
                                        />
                                        <input
                                            name="price"
                                            type="Number"
                                            required=""
                                            placeholder="Price"
                                            onChange={handelChagePost}
                                        />
                                        <input
                                            name="image"
                                            type="file"
                                            onChange={(e) => {
                                                setImage(
                                                    e.target.files[0],
                                                );
                                            }}
                                        />
                                        <button
                                            className="button_submit"
                                            onClick={submitPost}
                                        >
                                            Post
                                        </button>
                                    </div>
                                </section>
                            </div>
                        )}
                        {ShowEditPost &&
                            <div className="Post-PopUp">
                                <section className="section_form">
                                    <div className="action-post">
                                        <h2>Edit post</h2>
                                        <button onClick={() => { setEditPost(!ShowEditPost) }}>X</button>
                                    </div>

                                    <div
                                        id="consultation-form"
                                        className="feed-form"
                                    >
                                        <input
                                            name="title"
                                            required=""
                                            placeholder="Title"
                                            type="text"
                                            defaultValue={DataUpdateById.title}
                                            onChange={handelEditPost}
                                        />
                                        <input
                                            name="description"
                                            type="text"
                                            required=""
                                            placeholder="Description"
                                            defaultValue={DataUpdateById.description}
                                            onChange={handelEditPost}
                                        />
                                        <input
                                            name="location"
                                            type="text"
                                            required=""
                                            placeholder="Location"
                                            defaultValue={DataUpdateById.location}
                                            onChange={handelEditPost}
                                        />
                                        <input
                                            name="availble_week"
                                            type="text"
                                            required=""
                                            placeholder="Start date end date"
                                            defaultValue={DataUpdateById.availble_week}
                                            onChange={handelEditPost}
                                        />
                                        <input
                                            name="price"
                                            type="Number"
                                            required=""
                                            placeholder="Price"
                                            defaultValue={DataUpdateById.price}
                                            onChange={handelEditPost}
                                        />
                                        <input
                                            name="image"
                                            type="file"
                                            onChange={(e) => { setImageUpdate(e.target.files[0]) }}
                                        />
                                        <button
                                            className="button_submit"
                                            onClick={submitEditPost}
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </section>
                            </div>}
                        {ShowPopUpEmail && <div className="Post-PopUp">
                            <section className="section_form">
                                <div className="action-post">
                                    <h2>Edit Email Password</h2>
                                    <button onClick={() => setPopUpEmail(false)} >X</button>
                                </div>

                                <div
                                    id="consultation-form"
                                    className="feed-form"
                                >
                                    <p>{messageEmail}</p>
                                    <input
                                        name="email"
                                        required=""
                                        placeholder="Email"
                                        type="text"
                                        onClick={handelEditEmail}
                                    />
                                    <input
                                        name="password"
                                        type="text"
                                        required=""
                                        placeholder="Password"
                                        onClick={handelEditEmail}
                                    />
                                    <button
                                        className="button_submit"
                                        onClick={submitEditemail}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </section>
                        </div>}
                    </div>
                )}
            </div>
        </>
    );
}

export default Profile;
