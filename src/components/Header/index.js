import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import userSvg from "../../assets/user.svg";

function Header() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  function logout() {
    auth.signOut();
    navigate("/");
  }

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      navigate("/dashboard");
      const fetchUserData = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      };

      fetchUserData();
    }
  }, [user, navigate]);

  console.log(user?.uid);
  console.log(userData); 

  const displayNameUser = userData?.name.length > 9 ? `${userData.name.slice(0, 9)}...` : userData?.name;
  return (
    <div className="navbar">
      <p className="navbar-heading">Financial Records.</p>
      {user ? (
        <>
        <p className="navbar-link">
          <text className="txt-name" >Hi, {displayNameUser}</text>
          <span>
            <img
              src={user.photoURL ? user.photoURL : userSvg}
              width={user.photoURL ? "32" : "24"}
              style={{ borderRadius: "50%" }}
            />
          </span>
          <text className="txt-logout" onClick={logout}>Logout</text>
        </p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Header;
