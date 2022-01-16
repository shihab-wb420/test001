//import from " ";
import {useState,useEffect} from "react"
import { useLocation } from "react-router";
import PublicPost from "../components/post/publicPost"
import Loader from  "../components/loader/Loader"
const url = "http://localhost:4000"

const Home = () => {
  const { search } = useLocation();
  const [postDb, setPostDb] = useState([]);
  const [error,setError] = useState(true);
  
  //-----Fetching Post Details from Db-----
    const getAllPost = async ()=>{ 
 let data = await fetch(`${url}/all_post`,{
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
   getAllPost() 
 },[]);

if(error){
   return <Loader />
  }
  console.log(postDb);
  
  return (
   
    <div className="App">
       <h2> Public Post </h2> <hr/>
       <PublicPost allPosts={postDb}/>
    </div>
    

  );
}

export default Home;
