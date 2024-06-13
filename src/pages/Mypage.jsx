import React from "react";
import "./Mypage.css";
import { getAuth } from "firebase/auth";

const Mypage = () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    console.log(user);
  } else {
    // No user is signed in.
  }
  return (
    <div className="mypageContainer">
      <div className="userInfoDiv">
        <div className="userInfo">
          <img
            src={user.photoURL || "src/images/noimg_2.png"}
            className="mypage_userImg"
          />
          <p className="userText">{user.email}</p>
        </div>
      </div>
      <div className="interestListDiv">
        <div className="interestList">
          <h2>관심 목록</h2>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
