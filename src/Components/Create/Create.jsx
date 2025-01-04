import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/setup";
import { useNavigate } from "react-router-dom";
import "./Create.css";
import Header from "../Header/Header";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    kilometer: "",
    imagePath: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); 


  const validate = () => {
    const errors = {};
    if (!formData.title.trim())
      errors.title = "Title cannot be empty or just spaces.";
    if (!formData.category.trim())
      errors.category = "Category cannot be empty or just spaces.";
    if (!formData.price.trim() || isNaN(formData.price) || formData.price <= 0)
      errors.price = "Price must be a positive number.";
    if (!formData.kilometer.trim())
      errors.kilometer = "Kilometer cannot be empty or just spaces.";
    if (!formData.imagePath.trim())
      errors.imagePath = "Image path is required.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 const handleFileChange = (e) => {
   const file = e.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setFormData({ ...formData, imagePath: reader.result });
     };
     reader.readAsDataURL(file); 
   } else {
     setFormData({ ...formData, imagePath: "" }); 
   }
 };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "ads"), {
        ...formData,
        price: parseFloat(formData.price),
      });

      alert("Ad posted successfully! ID: " + docRef.id);

      navigate("/"); 
      setFormData({
        title: "",
        category: "",
        price: "",
        kilometer: "",
        imagePath: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post the ad.");
    }
  };

  return (
    <>
      <Header />
      <h2>Post your Ad</h2>
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <br />
          <input
            className="input"
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="error">{errors.title}</p>}
          <br />
          <label htmlFor="category">Category:</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <p className="error">{errors.category}</p>}
          <br />
          <label htmlFor="price">Price:</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="error">{errors.price}</p>}
          <br />
          <label htmlFor="kilometer">Kilometer:</label>
          <br />
          <input
            className="input"
            type="text"
            id="kilometer"
            name="kilometer"
            value={formData.kilometer}
            onChange={handleChange}
          />
          {errors.kilometer && <p className="error">{errors.kilometer}</p>}
          <br />
          <img
            width={"100px"}
            height={"100px"}
            src={formData.imagePath || ""}
            alt="Preview"
          />

          <br />
          <label htmlFor="image">Image:</label>
          <br />
          <input type="file" onChange={handleFileChange} />
          {errors.imagePath && <p className="error">{errors.imagePath}</p>}
          <br />
          <button className="uploadBtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Create;
