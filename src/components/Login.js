import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Avatar from "@material-ui/core/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import "./Login.css";
import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import ImageUpload from "./imageUpload";

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

export default function Login() {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      //checks if user is logged-in  in case of refresh
      if (authUser) {
        //user has logged in
        // console.log("a", authUser.user);
        setUser(authUser);
      } else {
        //user has logged out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  const signUp = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        console.log("a2", authUser.user);
        updateProfile(authUser.user, {
          displayName: username,
          photoURL: profilePic
        }).then(() => {
          console.log("Profile updated!!", authUser.user);
          setOpen(false);
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log(cred);
        setOpenSignIn(false);
      })
      .catch((error) => alert(error.message));
    // setOpenSignIn(false);
  };
  const handleProfile = () => {
    document.getElementsByClassName("logout_btn")[0].classList.toggle("hide");
  };

  return (
    <>
      {user ? (
        <div className="btns">
          <Button onClick={handleProfile} className="profile_btn">
            <Avatar
              className="header_avatar"
              alt={auth.currentUser?.displayName}
              src={
                auth.currentUser?.photoURL
                  ? auth.currentUser.photoURL
                  : "/static/images/1.png"
              }
            />
          </Button>
          <Button className="logout_btn hide" onClick={() => auth.signOut()}>
            Log Out
          </Button>
        </div>
      ) : (
        <>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </>
      )}
      <Modal onClose={() => setOpen(false)} open={open}>
        <Box sx={style}>
          <form className="login_form signup_form">
            <Input
              placeholder="Username"
              type="text"
              value={username}
              className="form_name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              type="email"
              value={email}
              className="form_email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              className="form_password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Profile Pic"
              type="text"
              value={profilePic}
              className="form_pic"
              onChange={(e) => setProfilePic(e.target.value)}
            />
            <Button type="submit" className="signup_btn" onClick={signUp}>
              Sign up
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal onClose={() => setOpenSignIn(false)} open={openSignIn}>
        <Box sx={style}>
          <form className="login_form">
            <Input
              placeholder="Email"
              type="email"
              value={email}
              className="form_email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              className="form_password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="signin_btn" onClick={signIn}>
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>

      <ImageUpload />
      {/* {user?.displayName ? (
        <ImageUpload />
      ) : (
        <h2>Sorry you need to login to upload</h2>
      )} */}
    </>
  );
}
