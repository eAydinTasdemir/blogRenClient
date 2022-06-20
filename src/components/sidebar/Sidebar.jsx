import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [tag, setTags] = useState([]);

  const handleMedium = async () => {
    try {
      const res = await axios.get("http://localhost:5000/account/medium");
      //console.log(res);
    } catch (err) {
      console.log(err);
    }

    //window.redirect_uri(res.redirect_uri)
  };

  useEffect(() => {
    const getTags = async () => {
      const res = await axios.get("http://localhost:5000/tag");
      setTags(res.data);
    };
    getTags();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://i.pinimg.com/236x/1e/3f/58/1e3f587572a7a7b20bbf1828595a1786--holiday-party-themes-holiday-gift-guide.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate qui
          necessitatibus nostrum illum reprehenderit.
        </p>
      </div>
      <div>
        <button onClick={handleMedium}>Post Medium</button>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {tag.map((c) => (
            <Link to={`/?tag=${c.name}`} className="link">
              <li className="sidebarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem"></div>
    </div>
  );
}
