import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useContext } from "react";
import { UrlContext } from "../../Layout";

function PostCard(props) {
    const [popUpEdit ,setEditPopUp] = useState(false)

    const URL = useContext(UrlContext)


    return (
        <>
            <div className="tutors_card" style={{ height: "max-content" }}>
                <div className="tutors-image" style={{ minHeight: () => window.innerWidth < 450? "50px" : "230px" }}>
                    <img
                        src={`${URL}/${props.image}`}
                        alt="tuors"
                        style={{
                            height: "100%",
                            maxWidth: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="tutors-info">
                    <div
                        className="action"
                        style={window.innerWidth < 450 ?{
                            display: "flex",
                            justifyContent:'space-between',
                            alignItems: "center",
                            width:"270px",
                        }:{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width:"270px"
                        }}
                    >
                        <h3 style={{ margin: "0px" }}>
                            <span>title : </span> {props.title}{" "}
                        </h3>
                        <div
                            style={{
                                fontSize: "20px",
                                display: "flex",
                                gap: "20px",
                                color: "#2C3424",
                            }}
                        >
                            <GrEdit onClick={() =>{
                            axios.get(`${URL}/post/${props._id}`).then((response)=>{
                                props.setDataUpdateById(response.data[0])
                                props.setEditDataPost(response.data[0])
                                setEditPopUp(true); props.showEditForm(popUpEdit) ; props.IdOfPost(props._id);
                            }).catch((err)=>{
                                console.log(err)
                            })
                            
                            }} /> <AiFillDelete onClick={()=>{
                                axios.delete(`${URL}/post/${props._id}`).then(()=>{
                                    props.getPosts()
                                }).catch((err)=>{
                                    console.log(err)
                                })
                            }} />
                        </div>
                    </div>
                    <div className="tutors-info-container">
                        <p className="class-title">
                            <span>description :</span> {props.description}
                        </p>
                        <p>
                            <span>start date end date :</span>{" "}
                            {props.start_date_end_date}{" "}
                        </p>
                        <p>
                            <span> price :</span> {props.price} ${" "}
                        </p>
                        <p>
                            <span> Location : </span> {props.location}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PostCard;
