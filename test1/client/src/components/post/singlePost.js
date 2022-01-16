// import from " ";
import {Link} from "react-router-dom"

const Post = ({postDb}) => {
  //console.log(postDb.createdAt)
  return (
    <div className="App">
       
         <div className="showPost"> 
       {
         postDb.map((postD)=>{
          return( <div className="postBox" key={postD._id}>
               <div className="postImg">
                  <img className="thumbnailImg" src="./images/default_profile.png" alt="thumbnail_Img..."/>
               </div>
               <div className="postDate">{postD.createdAt && new Date(postD.createdAt) } </div>
               <div style={{marginLeft:"1em"}}> 
                 <div className="postTitle"> 
                    <Link to={`/single/${postD._id}`}> 
                      {postD.title.substring(0,100)}<span className="readMore">...Read More </span>
                    </Link>
                 </div>
                 <p className="postDescription">
                   {
                       postD.description.substring(0,250)
                     }
                     <span className="">....</span>
                  </p>
                  <div className="postCategory">
                     <span>category: </span> {postD.category}
                  </div>
                </div>
              </div>
             );  })
           }
       </div>
    </div>
  );
}

export default Post
