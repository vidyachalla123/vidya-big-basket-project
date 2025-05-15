import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Veg.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Veg() {
  const productObjects = useSelector(globalState => globalState.products.veg);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(productObjects.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productObjects.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  const productListItems = currentProducts.map((product, index) => (
    <li key={index} className="veg-product-card">
      <img src={product.image} alt={product.name} className="veg-product-image" />
      <div className="veg-product-info">
        <h3 className="veg-product-name">{product.name}</h3>
        <p className="veg-product-price">${product.price}</p>
        <p className="veg-product-description">{product.description}</p>
      </div>
      <button
        className="veg-add-cart-button"
        onClick={() => {dispatch(AddToCart(product));toast.success(`${product.name} added to cart!!!`);}}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="veg-fullscreen-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="veg-container">
        <h1 className="veg-page-title">Vegetable Products</h1>

        <ol className="veg-product-list">
          {productListItems}
        </ol>

        <div className="veg-pagination-buttons">
          <button
            className="veg-page-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`veg-page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="veg-page-button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Veg;
