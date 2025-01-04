import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/setup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Sellform.css";

function Form() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brand: "",
    year: "",
    fuel: "",
    transmission: "",
    kmDriven: "",
    owners: "",
    adTitle: "",
    description: "",
    price: "",
    state: "",
    imagePath: "",
  });
  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelection = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Please upload a valid image (JPG or PNG).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imagePath: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, imagePath: "" });
    }
  };

  const validateForm = () => {
    if (
      !formData.brand ||
      !formData.year ||
      !formData.fuel ||
      !formData.transmission ||
      !formData.kmDriven ||
      !formData.owners ||
      !formData.adTitle ||
      !formData.description ||
      !formData.price ||
      !formData.state ||
      !formData.imagePath
    ) {
      toast.error("Please fill out all the fields.");
      return false;
    }

     const currentYear = new Date().getFullYear();
     const year = parseInt(formData.year, 10);
     if (isNaN(year) || year < 1900 || year > currentYear) {
       toast.error(
         "Please enter a valid year between 1900 and the current year."
       );
       return false;
     }
    if (isNaN(formData.kmDriven) || parseInt(formData.kmDriven) <= 0) {
      toast.error("Please enter a valid number for 'KM driven'.");
      return false;
    }

    if (isNaN(formData.price) || parseInt(formData.price) <= 0) {
      toast.error("Please enter a valid price.");
      return false;
    }

    return true;
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; 

    const payload = {
      brand: formData.brand,
      year: formData.year,
      fuel: formData.fuel,
      transmission: formData.transmission,
      km_driven: formData.kmDriven,
      price: formData.price,
      ad_title: formData.adTitle,
      description: formData.description,
      state: formData.state,
      image: formData.imagePath,
    };

    try {
      const docRef = await addDoc(collection(db, "products"), payload);
      toast.success("Product added successfully", {
        duration: 1500,
        onClose: () => navigate("/"),
      });
    } catch (error) {
      console.error("Error adding product: ", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="form-list">
      <div className="form-heading">
        <h2>POST YOUR AD</h2>
      </div>
      <form className="form-container" onSubmit={handleSubmitForm}>
        <div className="header-container">
          <h3>Selected Category</h3>
          <p>Cars / Cars</p> <a href="#">Change</a>
        </div>
        <div className="input-container">
          <h3>Include Some Details</h3>

          <label htmlFor="brand">Brand *</label>
          <select
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Suzuki">Suzuki</option>
            <option value="Volvo">Volvo</option>
            <option value="BMW">BMW</option>
          </select>

          <label htmlFor="year">Year *</label>
          <input
            type="text"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleInputChange}
          />

          <label htmlFor="fuel">Fuel *</label>
          <div className="fuel-options">
            {["CNG & Hybrids", "Diesel", "Electric", "LPG", "Petrol"].map(
              (fuel) => (
                <button
                  type="button"
                  key={fuel}
                  className={formData.fuel === fuel ? "selected" : ""}
                  onClick={() => handleSelection("fuel", fuel)}
                >
                  {fuel}
                </button>
              )
            )}
          </div>

          <label htmlFor="transmission">Transmission *</label>
          <div className="transmission-options">
            {["Automatic", "Manual"].map((trans) => (
              <button
                type="button"
                key={trans}
                className={formData.transmission === trans ? "selected" : ""}
                onClick={() => handleSelection("transmission", trans)}
              >
                {trans}
              </button>
            ))}
          </div>

          <label htmlFor="kmDriven">KM driven *</label>
          <input
            type="text"
            id="kmDriven"
            name="kmDriven"
            value={formData.kmDriven}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="owners">No. of Owners *</label>
          <div className="owners-options">
            {["1st", "2nd", "3rd", "4+"].map((owner) => (
              <button
                type="button"
                key={owner}
                className={formData.owners === owner ? "selected" : ""}
                onClick={() => handleSelection("owners", owner)}
              >
                {owner}
              </button>
            ))}
          </div>

          <label htmlFor="adTitle">Ad title *</label>
          <input
            type="text"
            id="adTitle"
            name="adTitle"
            value={formData.adTitle}
            onChange={handleInputChange}
          />

          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            style={{
              width: "400px",
              height: "150px",
              marginLeft: "30px",
              marginBottom: "20px",
            }}
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="price-container">
          <h3>SET A PRICE</h3>
          <label htmlFor="price">Price *</label>
          <input
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <img
          width={"100px"}
          height={"100px"}
          src={formData.imagePath || ""}
          alt="Preview"
        />
        <input type="file" onChange={handleFileChange} />

        <div className="location-container">
          <h3>Confirm your location</h3>
          <label htmlFor="location">State *</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            <option value="Kerala">Kerala</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Delhi">Delhi</option>
            <option value="Haryana">Haryana</option>
            <option value="Karnataka">Karnataka</option>
          </select>
        </div>

        <div className="postbtn-container">
          <button type="submit">POST NOW</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Form;
