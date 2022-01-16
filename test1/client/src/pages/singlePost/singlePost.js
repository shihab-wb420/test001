// import from " ";
import axios from "axios";
import "./singlePost.css"
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import Comment from "../../components/post/comment"
import Loader from  "../../components/loader/Loader"
const url = "http://localhost:4000"

const SinglePost = () => {
  const location = useLocation();
  /*const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);*/
  const [error,setError] =useState(true)
  const [post, setPost] = useState([]);
  const postId = location.pathname.split("/")[2];
  
//----Fetch single post by post id-------
  const getSinglePost = async ()=>{ 
 let data = await fetch(`${url}/all_post/`+postId,{
      method:"get",
      headers:{
        "Content-Type":" application/json"
      }
    });
   data = await data.json();
    setPost(data);
   setError(false)
    
  }
  
useEffect(()=>{
   getSinglePost() 
 },[]);

 if(error){
   return <Loader />
  }
  
  console.log("post", post);
  
  /*  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {}
  };
  */
  
  return (
  <div className="singlePost">
         <h2> Single Post </h2>
     { post.map((postDb)=>{ 
     return(  
        <div className="singlePostWrapper" key={postDb._id}>
          <h1 className="singlePostTitle"> 
              {postDb.title}
          </h1> 
          <p style={{textAlign:"left" }}> {postDb.description}</p>
          <h5>Category: {postDb.category}</h5>
        </div>
       );
     })
  }
    {/*--------Comment Section------------*/}
     <Comment post_id={postId}/>
  </div>
  );
}

export default SinglePost
