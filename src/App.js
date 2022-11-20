import "./styles.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Post from "./components/Post";
import { InstagramEmbed } from "react-social-media-embed";
import { db, firebaseApp } from "./components/firebase";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query
} from "firebase/firestore";
import { auth } from "./components/firebase";

import {
  onAuthStateChanged
} from "firebase/auth";
// import { Instagram } from "reactjs-social-embed";

export default function App() {
  const [posts, setPost] = useState([]);
  const [user, setUser] = useState(null);
  // const auth= getAuth();
  // console.log(auth.user)
  // const q=[],unsubscribe={};

  useEffect(() => {
    const unsubscribeUser = onAuthStateChanged(auth, (authUser) => {
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

    
    // console.log(db.collection("posts"));
    // const q = getDocs(collection(db, "posts"));
    // console.log(q.then(doc=> doc.data() ) );
    // q.then((doc) => console.log(doc._snapshot.docChanges[0].doc.data.value.mapValue.fields));
    // q.forEach((doc) => {
    //   console.log(doc.id + "......." + doc.data());
    // });
    // db.collection("posts").onSnapshot((snapshot) => {
    //   setPost(snapshot.docs.map((doc) => doc.data()));
    // });
    //correct one
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snap) => {
      setPost(snap.docs.map((s) => s.data()));
    });
      
      return unsubscribe,unsubscribeUser;
    //correct end
  }, [posts]);
  // const memoized = useMemo(()=>{
  //    unsubscribe = onSnapshot(q, (snap) => {
  //       setPost(snap.docs.map((s) => s.data()));
  //     });
  // },[q])

  // const q = getDocs(collection(db, "posts"));
  // q.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
  //   });

  // const firestore = getFirestore(firebaseApp);
  // const special = collection(firestore, "posts");
  // async function readASingleDoc() {
  //   const mySnap = await getDocs(special);
  // console.log(mySnap);
  // if (mySnap.exists()) {
  // const docData = mySnap.data();
  // console.log(`My data is ${JSON.stringify(docData)}`);
  // }
  // }

  // readASingleDoc();

  return (
    <div className="app_wrapper">
      <Header />

    <div className={`body_wrapper ${user ? '' : "no-data"}` }>
        <div className="body_left_wrapper">
         { user
          ? 
          <>
          {posts.map((post) => (
            // console.log(post)
            <Post
              key={post.id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          ))}
          </>
      

          
          
          //   <>
          //  <Post
          //   username="Vaishali"
          //   caption="Hey"
          //   imageUrl="https://images.unsplash.com/photo-1420593248178-d88870618ca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJhbHxlbnwwfHwwfHw%3D&w=1000&q=80"
          // />
          // <Post
          //   username="Vaishali"
          //   caption="Butterfly"
          //   imageUrl="https://images.unsplash.com/photo-1516475429286-465d815a0df7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"
          // />
          // <Post
          //   username="Vaishali"
          //   caption="Hey"
          //   imageUrl="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752"
          // />
          // <Post
          //   username="Vaishali"
          //   caption="Hey"
          //   imageUrl="https://img.fixthephoto.com/blog/images/gallery/news_preview_mob_image__preview_579.jpg"
          //  /> 
          //  </>
          
          

          :
          <div className='no-data-div'>
          <h2>Sorry you need to login</h2>
          </div>
         }
        </div>

        <div className="body_right_wrapper">
          <div>
            <InstagramEmbed
              url="https://www.instagram.com/p/Ck3CAHBjm0G/"
              width={328}
              captioned
            />
          </div>
        </div>
      </div>
      {/* <Post
        username="Vaishali"
        caption="Beauty can be found anywhere."
        imageUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
      />
      <Post
        username="Mishti"
        caption="Be The Change"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4A_cJiGKT3Om_X2hdZ91l1FHfzFoVbDoJkA&usqp=CAU"
      /> */}
    </div>
  );
}
