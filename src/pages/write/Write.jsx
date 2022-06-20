import { useContext, useState, useEffect } from "react";
import "./write.css";
import axios from "axios";
import { Context } from "../../context/Context";
import FileBase64 from "react-file-base64";
import { useForm, Controller } from "react-hook-form";
import { TagsInput } from "react-tag-input-component";

export default function Write() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useContext(Context);
  const [tag, setTags] = useState([]);
  const [paidPost, setPaidPost] = useState(false);

  const handleCheckChange = () => {
    if (paidPost === true) {
      setPaidPost(false);
    } else {
      setPaidPost(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      subtitle,
      content,
      image,
      tag: tag,
      paidPost: paidPost,
    };
    try {
      const res = await axios.post("http://localhost:5000/posts", newPost);
      //console.log(newPost.tag);

      /*const resTag = await axios.post(
        "http://localhost:5000/tag/addPost",
        newPost.tag
      );*/
      window.location.replace("/post/" + res.data._id);
    } catch (err) {}
  };
  useEffect(() => {
    const getTags = async () => {
      const res = await axios.get("http://localhost:5000/tag");
      setTags(res.data);
    };
    getTags();
  }, []);

  return (
    <div className="write">
      {image && (
        <FileBase64
          className="writeImg"
          multiple={false}
          onDone={({ base64 }) => setImage(base64)}
          style={{ display: "none" }}
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <FileBase64
            className="writeImg"
            multiple={false}
            onDone={({ base64 }) => setImage(base64)}
          />

          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Subtitle..."
            type="text"
            className="writeInput"
            onChange={(e) => setSubtitle(e.target.value)}
          ></textarea>
        </div>

        <div className="sidebarItem">
          <pre>{JSON.stringify[tag]}</pre>

          <TagsInput
            value={tag}
            onChange={setTags}
            name="tags"
            placeHolder="tag ? ..."
          />

          <em>press enter to add new tag</em>
        </div>

        <div className="riteFormGroup">
          <label>
            Paid Post :
            <input
              name="isPaid"
              type="checkbox"
              checked="false"
              onChange={true}
            />
          </label>
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <button className="writeSubmit" typw="sumbit">
          Publish
        </button>
      </form>
    </div>
  );
}
