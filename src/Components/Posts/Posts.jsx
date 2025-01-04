import React from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { useNavigate } from 'react-router-dom';

function Posts({ serch, products }) {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate (`/details/${id}`); 
  };

  return (
    <div className="postParentDiv">
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((data) => (
            <div className="card" key={data.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div
                className="image"
                onClick={() => handleImageClick(data.id)} 
                style={{ cursor: 'pointer' }} 
              >
                <img src={data.image} alt="Product" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {data.price}</p>
                <span className="kilometer">{data.ad_title}</span>
                <p className="name">{data.brand}</p>
              </div>
              <div className="date">
                <span>Fri Dec 27 2024</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
