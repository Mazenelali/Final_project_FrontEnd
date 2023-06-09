import { useState } from "react";
import { GrEdit } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import Swal from "sweetalert2";


function PostCard(props) {
    const [popUpEdit, setEditPopUp] = useState(false);

  

    return (
        <>
            <div className="tutors_card" >
                <div
                    className="tutors-image"
                    style={{
                        minHeight: ()=>window.innerWidth < 450 ? "50px" : "230px",
                    }}
                >
                    <img
                        src={
                            props.image.startsWith("https")
                                ? props.image
                                : `${process.env.REACT_APP_URL}/${props.image}`
                        }
                        alt="tuors"
                        style={{
                            
                            Width: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
                <div className="tutors-info">
                    <div
                        className="action"
                        style={
                            window.innerWidth < 450
                                ? {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                  }
                                : {
                                      display: "flex",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: "100%",
                                  }
                        }
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
                            <GrEdit
                                onClick={() => {
                                    axios
                                        .get(`${process.env.REACT_APP_URL}/post/${props._id}`)
                                        .then((response) => {
                                            props.setDataUpdateById(
                                                response.data[0]
                                            );
                                            props.setEditDataPost(
                                                response.data[0]
                                            );
                                            setEditPopUp(true);
                                            props.showEditForm(popUpEdit);
                                            props.IdOfPost(props._id);
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                        });
                                }}
                            />{" "}
                            <AiFillDelete
                                onClick={() => {
                                    Swal.fire({
                                        title: 'Are you sure delete this post ?',
                                        text: "You won't be able to revert this!",
                                        icon: 'warning',
                                        showCancelButton: true,
                                        confirmButtonColor: '#FCDC5B',
                                        cancelButtonColor: '#FF673D',
                                        confirmButtonText: 'Yes, delete it!'
                                      }).then((result) => {
                                        if (result.isConfirmed) {
                                            axios
                                            .delete(`${process.env.REACT_APP_URL}/post/${props._id}`)
                                            .then(() => {
                                                props.getPosts();
                                            })
                                            .catch((err) => {
                                                console.log(err);
                                            });
                                        }
                                      })
                                }}
                            />
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
