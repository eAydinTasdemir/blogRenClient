import "./post.css";
import { Link } from "react-router-dom";
import noImage from "../images/noimage.svg";

export default function Post({ post }) {
  const PF = "";
  return (
    <div className="post">
      {post.image && (
        <img src={post.image || noImage} alt="" className="postImg" />
      )}

      <div className="postInfo">
        <div className="postCats">
          {post.tag.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.content}</p>
    </div>
  );
}
