
import AddPost from "../../components/post/addPost"
import ShowPost from "../../components/post/showPost"

const Blog = () => {
  
  return (
    <div className="Blog" style={{height:"content-fit", width:"100%"}}>
         <AddPost /> <br/>
         <ShowPost />
    </div>
  );
}

export default Blog;
