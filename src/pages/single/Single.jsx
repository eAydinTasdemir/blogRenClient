import "./single.css";
import Sidebar from "../../components/sidebar/Sidebar";
import SinglePost from "../../components/singlePost/SinglePost";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import { useLocation } from "react-router";
import notAuth from "../../components/notAuth/notAuth";

export default function Single() {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [paidPost, setPaidpost] = useState(false);
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/posts/" + path);
      setPaidpost(res.data.paidPost);
    };
    getPost();
  }, [path]);

  if (paidPost === true) {
    if (user?.paidmembership === true) {
      return (
        <div className="single">
          <SinglePost />
          <Sidebar />
        </div>
      );
    } else {
      <notAuth />;
    }
  } else {
    return (
      <div className="single">
        <SinglePost />
        <Sidebar />
      </div>
    );
  }
}
