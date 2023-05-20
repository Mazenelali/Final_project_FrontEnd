import "./profile.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Loder from "../../component/loder/Loder";
import logo from "../../image/logo.png";
import { useNavigate } from "react-router-dom"
import { GrEdit } from "react-icons/gr"
import PostCard from "./postCard";

function Profile() {
    const navigate = useNavigate()
    const [DataProfile, setDataProfile] = useState(null);

    const [DataProfileUpdate ,setDataUpdate] = useState(
            {
        first_name:"",
        last_name:"",
        class_title :"",
        description:"",
        location :"",
        number_phone:"",
        image:null,
        languages:""
     }
    )

    const [isCliked, setClicked] = useState(false)

    const [dataPost , setDataPost] = useState([])

    const isclick = () => {
        setClicked(!isCliked)
    }

    const clearLocalStorage = () => {
        localStorage.clear()
        setTimeout(() => {
            navigate('/Homepage')
        }, 2000);
    }

    const getDataProfile = () => {
        const role = localStorage.getItem("role");
        const id = localStorage.getItem("_id");

        if (role === "tutor") {
            axios
                .get(`http://localhost:4000/User/${id}`)
                .then((response) => {
                    setDataProfile(response.data);
                    setDataUpdate(
                        {
                            first_name:response.data[0].first_name,
                            last_name:response.data[0].last_name,
                            class_title :response.data[0].class_title,
                            description:response.data[0].description,
                            location :response.data[0].location,
                            number_phone:response.data[0].number_phone,
                            image:response.data[0].image,
                            languages:response.data[0].languages,
                        }
                    )
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .get(`http://localhost:4000/Student/getStudent/${id}`)
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

    const handelChageDataUpdate = (e)=>{
        const value = e.target.value
        setDataUpdate({
            ...DataProfileUpdate,
            [e.target.name]:value
        })
    }
    const SubmitEditProfile = ()=>{
        
        const formData = new FormData();
        formData.append('image', DataProfileUpdate.image);
        formData.append('first_name', DataProfileUpdate.first_name);
        formData.append('last_name', DataProfileUpdate.last_name);
        formData.append('languages', DataProfileUpdate.languages);
        formData.append('class_level', DataProfileUpdate.class_level);
        formData.append('class_title', DataProfileUpdate.class_title);
        formData.append('location', DataProfileUpdate.location);
        formData.append('description', DataProfileUpdate.description);
        formData.append('number_phone', DataProfileUpdate.number_phone);

        console.log(formData)

        axios.patch(`http://localhost:4000/User/${localStorage.getItem('_id')}` , formData).then((response)=>{
        console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const getDataPost = ()=>{
        
        axios
        .get(`http://localhost:4000/post/`)
        .then((response) => {
            const ID = localStorage.getItem("_id")
            const filterData = response.data.filter((ele)=>{
                const find = ele.User_id[0]._id.includes(ID);
                return find
            })
            console.log(filterData)
            setDataPost(filterData)
        })
        .catch((err) => {
            console.log(err);
        });
    }
    useEffect(()=>{
        const filterData = dataPost.filter((ele)=>{
            const find = ele.title.includes("mafi")
            return find
        })
        console.log(filterData)
    },[])




    return (
        <>
            <div className="Shape">
                <div className="image-profile">
                    <img
                        src={
                            !DataProfile
                                ? logo
                                : `http://localhost:4000/${DataProfile[0].image}`
                        }
                        alt=""
                    />
                </div>
            </div>
            <div className="profile-container">
                {!DataProfile ? "WAITT !!" :
                    <div className="profile">
                        <div className="personal-info">
                            <h2>{isCliked === false ? `${DataProfile[0].first_name} ${DataProfile[0].last_name}` : <> <input type="tex" defaultValue={DataProfile[0].first_name} name="first_name" onChange={handelChageDataUpdate} /> <input type="tex" defaultValue={DataProfile[0].last_name} name="last_name" onChange={handelChageDataUpdate} /> </>}</h2> <button onClick={isclick}><GrEdit /></button>
                        </div>
                        <div className="each-info">
                            <p className="Class-title"><span>Class Title : </span>{isCliked === false ? DataProfile[0].class_title : <input type="tex" defaultValue={DataProfile[0].class_title} name="class_title" onChange={handelChageDataUpdate}/>}</p>
                            <p className="description-profile"><span>Description about yourself : </span>{isCliked === false ? DataProfile[0].description : <input type="tex" defaultValue={DataProfile[0].description}  name="description" onChange={handelChageDataUpdate} />}</p>
                            <p className="Languages"><span>Languages : </span>{isCliked === false ? DataProfile[0].languages : <input type="tex" defaultValue={DataProfile[0].languages} name="languages" onChange={handelChageDataUpdate} />}</p>
                            <p className="Location"><span>Location : </span>{isCliked === false ? DataProfile[0].location : <input type="tex" defaultValue={DataProfile[0].location} name="location" onChange={handelChageDataUpdate} />}</p>
                            <p className="Number Phone"><span>Number phone : </span>{isCliked === false ? DataProfile[0].number_phone : <input type="tex" defaultValue={DataProfile[0].number_phone} name="number_phone" onChange={handelChageDataUpdate} />}</p>
                            {isCliked && <p> <span>image :</span> <input type="file" name="image" onChange={(e)=>{setDataUpdate({...DataProfileUpdate, image : e.target.files[0]})}} /> <button onClick={SubmitEditProfile}> Edit </button></p>}
                        </div>
                        <div className="post_cards">
                            { !dataPost?"wait !!" : dataPost.map((ele)=>{
                                return  <PostCard key={dataPost.indexOf(ele)} title = {ele.title} description = {ele.description} location = {ele.location} start_date_end_date = {ele.availble_week} price = {ele.price} image = {ele.image}/>
                            })
                            }
                        </div>
                    </div>
                }
            </div>
            <div className="Shape-button">
                <div className="logout">
                    <span><button
                        onClick={() => { clearLocalStorage() }}
                    >Logout</button></span>
                </div>
            </div>
        </>
    );
}

export default Profile;
