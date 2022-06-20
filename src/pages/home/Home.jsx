import { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [mToken, setMtoken] = "";

  /*setMtoken = {
    const res = await axios.get(

    "https://medium.com/m/oauth/authorize?client_id=df4ff66b9e66",
    "scope=basicProfile"
    &state={{state}}
    &response_type=code
    &redirect_uri={{redirectUri}}
    )
  };
  */

  useEffect(() => {
    const fetchPosts = async () => {
      //console.log(search);
      const res = await axios.get("http://localhost:5000/posts" + search);
      setPosts(res.data);
    };
    fetchPosts();
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
