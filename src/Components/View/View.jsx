import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the query parameter
import { doc, getDoc } from "firebase/firestore"; // Firebase Firestore
import { db } from "../../firebase/setup"; // Import your Firebase configuration

import "./View.css";
import Header from "../Header/Header";
import Footer from "../Footer2/Footer";

function View() {
  const { id } = useParams(); 
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id); // 'products' is your collection name
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProductData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!productData) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header />
      <div className="viewParentDiv">
        <div className="imageShowDiv">
          <img src={productData.image} alt={productData.title} />
        </div>
        <div className="rightSection">
          <div className="productDetails">
            <p>&#x20B9; {productData.price}</p>
            <span>{productData.ad_title}</span>
            <p>Brand : {productData.brand}</p>
            <p>Year :{productData.year}</p>
            <p>Kilometer Driven :{productData.km_driven}</p>
            <p>State :{productData.state}</p>
            <p>transmission : {productData.transmission}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default View;
