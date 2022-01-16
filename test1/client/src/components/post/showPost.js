import {useState,useEffect} from "react"
import Loader from  ".././loader/Loader"

const ShowPost = () => {
  const [postDb, setPostDb] = useState([]);
  const [error,setError] = useState(true);
  const url = "http://localhost:4000"
  
  //-----Fetching Post Details from Db-----
    const getPost = async ()=>{ 
    let localUser = JSON.parse(localStorage.getItem("user"));
     const id = localUser._id;
     
 let data = await fetch(`${url}/posts/`+id,{
      method:"get",
      headers:{
        "Content-Type":" application/json"
      }
    });
   data = await data.json();
    setPostDb(data);
    setError(false);
  }
  
 useEffect(()=>{
   getPost() 
 },[postDb]);
 
/* if(error){
   return <Loader />
 };*/
  console.log(postDb);
  
  
  return (
    <div className="showPostContainer">
        <h3> My Post </h3>
       <div className="showPost"> 
      { error ?  <Loader /> 
         : postDb.map((postD)=>{
          return( <div className="postBox" key={postD._id}>
               <div className="postImg">
                  <img className="thumbnailImg" src="./images/default_profile.png" alt="thumbnail_Img..."/>
               </div>
               <div style={{marginLeft:"1em"}}> 
                 <div className="postTitle"> {postD.title} </div>
                 <p className="postDescription">
                     {postD.description}
                  </p>
                  <div className="postCategory">
                     <span>category: </span> {postD.category}
                  </div>
                    <span className="postDate">
                       {postD.createdAt && new Date(postD.createdAt).toDateString()}
                    </span>
                </div>
              </div>
             );
              })
          }
        </div>
    </div>
  );
}

export default ShowPost;
