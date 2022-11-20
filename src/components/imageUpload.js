// import "";

import { Button, Input } from "@mui/material";
import { useState, useEffect } from "react";
import { db, storage, storageRef } from "./firebase";
import { firebase } from "firebase/app";
// import { getAuth } from "firebase/auth";
import {
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable,
  ref
} from "firebase/storage";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp
} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
// import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import AddBoxOutlinedIcon from "@material-ui/icons/AddBoxOutlined";
import "./imageUpload.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function ImageUpload() {
  const [caption, setCaption] = useState("");
  const [user, setUser] = useState("");
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleClick = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      document.getElementsByClassName("popup-btn")[0].disabled = false;
      //   console.log("mmmm", image);
    }
  };
  const handleUpload = () => {
    // const auth = getAuth();
    // const currentUser = auth.currentUser;
    if (currentUser != null) {
      //   console.log("user", currentUser);
      setUser(currentUser.displayName);
      //   console.log(user);
    }
    // createPost();
    //storage
    const uploadRef = ref(storageRef, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(uploadRef, image);
    // uploadBytes(uploadTask, image).then((snapshot) => {
    //   console.log("snap", snapshot);
    // });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog =
          Math.random(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("prog", prog);
        setProgress(prog);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        // storage.ref("images")
        // .child(image.name)
        console.log(user);
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url + "....." + typeof url);
          addDoc(collection(db, "posts"), {
            timestamp: serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: user
          });
        });
        setProgress("");
        setImage(null);
        setCaption("");
        setUploadOpen(false);
      }
    );
  };

  return (
    <>
      <Button onClick={() => setUploadOpen(true)} className={`add_post-btn ${auth.currentUser?.displayName ? '' : "hide"} `}>
        <AddBoxOutlinedIcon fontSize="large" className="add_post" />
      </Button>
      {auth.currentUser?.displayName ? (
        <Modal onClose={() => setUploadOpen(false)} open={uploadOpen}>
          <Box sx={style} className="popup-modal">
            <progress value={progress} max="100" className="progress-bar" />
            <Input
              className="popup-input"
              type="text"
              placeholder="Enter a caption..."
              onChange={(e) => setCaption(e.target.value)}
            />
            <Input
              className="popup-input"
              type="file"
              placeholder="Enter image ..."
              onChange={(e) => handleClick(e)}
            />
            {image != null ? (
              <Button
                type="submit"
                onClick={handleUpload}
                className="popup-btn"
              >
                Upload
              </Button>
            ) : (
              <Button
                type="submit"
                onClick={handleUpload}
                className="popup-btn"
                disabled
              >
                Upload
              </Button>
            )}
          </Box>
        </Modal>
      ) : (
        <Modal onClose={() => setSignUpOpen(false)} open={signUpOpen}>
          <Box sx={style} className="popup-modal">
            <h2>Sorry you need to login to upload</h2>
          </Box>
        </Modal>
      )}
    </>
  );
}
