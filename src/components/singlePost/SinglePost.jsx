import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlePost.css";
import noImage from "../images/noimage.svg";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [image, setImage] = useState(null);
  const [like, setLike] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [paidPost, setPaidpost] = useState(false);

  const handleComment = (async) => {
    try {
      axios.put("http://localhost:5000/posts/" + post._id + "/comment", {
        comment: newComment,
      });
    } catch (err) {}
  };

  useEffect(() => {
    setIsLiked(like.includes(user._id));
  }, [user._id, post.like]);

  const likeHandler = () => {
    try {
      //console.log(user._id);
      axios.put("http://localhost:5000/posts/" + post._id + "/like", {
        userId: user._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setSubtitle(res.data.subtitle);
      setContent(res.data.content);
      setImage(res.data.image);
      setLike(res.data.likes.length);
      setComment(res.data.comment);
      setPaidpost(res.data.paidPost);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:5000/posts/${post._id}`, {
        username: user.username,
        title,
        subtitle,
        content,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {image && (
          <img src={image || noImage} alt="" className="singlePostImg" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon far fa-trash-alt"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            <b> {post.tag}</b>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostTitleInput"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        ) : (
          <p className="singlePostTitle">{subtitle}</p>
        )}
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{content}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
      <div className="postWrapper">
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`http://localhost:3000/assets/like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`http://localhost:3000/assets/heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
        </div>
        <div className="comment-box">
          <h2>Add Comment</h2>
          <form class="comment-form">
            <div className="postBottomCenter">
              <textarea
                placeholder="Comment ..."
                type="text"
                className="writeInput"
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <div class="comment-form-actions">
                <button onClick={handleComment}>Post Comment</button>
              </div>
            </div>
          </form>
          <div className="comment-list">
            <div className="comment">
              {comment.map((c) => (
                <div className="comment-footer ">
                  <p className="comment-body">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
