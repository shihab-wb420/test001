//import from " ";
  import Post from "./singlePost"
  const PublicPost=({allPosts})=>{
    
  
  return (
   
    <div className="App">
      <Post postDb={allPosts}/>
    </div>
    

  );
}

export default PublicPost
