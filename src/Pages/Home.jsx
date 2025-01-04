import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase/setup"; 
import Header from "../Components/Header/Header";
import Banner from "../Components/Banner/Banner";
import Posts from "../Components/Posts/Posts";
import Footer2 from "../Components/Footer2/Footer"

function Home() {
  const [product, setProduct] = useState([]);
  const [serch, setSerch] = useState("");

  const getProduct = async () => {
    try {
      const q = query(collection(db, "products"));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProduct(productsArray);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  console.log(product,'form howm')
  return (
    <div className="homeParentDiv">
      <Header setserch={setSerch} />
      <Banner />
      <Posts products={product} serch={serch} />
      <Footer2 />
    </div>
  );
}

export default Home;
