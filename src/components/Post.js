// import Avatar from "@material-ui/core/Avatar";
// import { useState } from "react";
import { getAuth } from "firebase/auth";
import Avatar from "@material-ui/core/Avatar";
import "./Post.css";
// import Avatar from "@material-ui/core/Avatar";

export default function Post({ caption, imageUrl }) {
  // const [user, setUser] = useState(null);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  // if (currentUser != null) {
  //   setUser(currentUser?.displayName);
  // }
  // console.log("auth", auth.currentUser);

  return (
    <div className="post_wrapper">
      {/* <h1>Yo</h1> */}
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={auth.currentUser?.displayName}
          src={
            auth.currentUser?.photoURL
              ? auth.currentUser.photoURL
              : "/static/images/1.png"
          }
        />
        <h3 className="">{auth.currentUser?.displayName}</h3>
      </div>
      <div
        className="post_content"
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
      >
        <img src={imageUrl} className="post_image" />
      </div>
      {caption ? (
        <div className="post_caption">
          <h4 className="post_caption-name">{auth.currentUser?.displayName}</h4>
          <p className="post_caption-text">{caption}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
