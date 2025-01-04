import React, { useState, useEffect } from "react";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import Login from "../Login/Login";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

function Header(props) {
  const [loginPop, setLoginPop] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  function handleSellClick() {
    if (isLoggedIn) {
      navigate("/create");
    } else {
      toast.error("Please log in to post a product!");
    }
  }

 function handleLoginClick() {
   if (isLoggedIn) {
     auth
       .signOut()
       .then(() => {
         setIsLoggedIn(false);
         toast.success("You have been logged out.");
         setLoginPop(false);
       })
       .catch((error) => {
         console.error("Error logging out:", error);
         toast.error("Error logging out.");
       });
   } else {

     setLoginPop(!loginPop);
   }
 }


  return (
    <>
      <div className="headerParentDiv">
        <div className="headerChildDiv">
          <div className="brandName">
            <OlxLogo />
          </div>
          <div className="placeSearch">
            <Search />
            <input type="text" />
            <Arrow />
          </div>
          <div className="productSearch">
            <div className="input">
              <input
                onChange={(e) => {
                  props?.setserch(e.target.value);
                }}
                type="text"
                placeholder="Find car, mobile phone and more..."
              />
            </div>
            <div className="searchAction">
              <Search color="#ffffff" />
            </div>
          </div>
          <div className="language">
            <span> ENGLISH </span>
            <Arrow />
          </div>
          <div className="loginPage">
            <span onClick={handleLoginClick}>
              {isLoggedIn ? "Logout" : "Login"}
            </span>
            <hr />
          </div>

          <div className="sellMenu" onClick={handleSellClick}>
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        </div>
      </div>
      {loginPop && !isLoggedIn && <Login setLoginPop={setLoginPop} />}
      <ToastContainer /> 
    </>
  );
}

export default Header;
