// import from " ";
import { useState, useEffect} from "react";

const Comment = ({post_id}) => {
  const url = "http://localhost:4000"
  const [error,setError] = useState(false)
  const [comment,setComment] = useState("")
  const [comments,setComments] = useState([])
  const [commentsLoading, setCommentsLoading] = useState(true)

  //-----Handle Publish Comment-----
  const PublishComment = async (e)=>{
    e.preventDefault();
   
    if(!comment){
      setError(true)
      return false
    }
    
    let localUser = JSON.parse(localStorage.getItem("user"));
     const userId = localUser._id;
     const userName = localUser.name;
     const postId = post_id;
    console.log(userName);
    
    let data = await fetch(`${url}/publish`,{
      method:"post",
      body: JSON.stringify({comment, userId, userName, postId}),
      headers:{
        "Content-Type":" application/json"
      }
    });
    data = await data.json();
    console.log( data)
  
    setComment("")
  }
  
  //---fetch comment by post postId-------
  const getComments = async ()=>{ 
    let postId = post_id; 
    console.log("postisld",postId)
    let data = await fetch(`${url}/get_comments/`+postId,{
      method:"get",
      headers:{
        "Content-Type":" application/json"
      }
    }); 
   data = await data.json();
    setComments(data);
  // console.log("comments...",data) 
  setCommentsLoading(false)
  }
    
useEffect(()=>{
   getComments() 
 },[PublishComment]);

  
  return (
   
      <div className="commentWrapper"> 
              <h2> Publish Comment <hr/> </h2>
          <div className="ShowCommentWrapper"> 
       { commentsLoading ? <p> Loading Comments...</p> 
         :  comments.map((comment)=>{
           return(
             <div className="showComment">
                <div className="commentUserName"> {comment.userName} </div>
                <div className="commentContent"> 
                    {comment.comment}
                </div>
             </div>
         ); })
         }
          </div>
          <h2>  <hr/> </h2>
          <div className="commentInputWrapper commonFormStyle"> 
            <textarea value={comment} onChange={e=> setComment(e.target.value)} name="desc" type="text" placeholder="  Write your Comment..."/>
            {error && <p style={{color:"red"}} className="error"> Please write something..</p>}
            <input style={{display:"none"}} type="text" placeholder="  Enter your Name" name="name"/>
            <button onClick={PublishComment} className="commentSubmit commonSubmitButton"> Publish</button>
          </div>
     
    </div>
   
  );
}

export default Comment
