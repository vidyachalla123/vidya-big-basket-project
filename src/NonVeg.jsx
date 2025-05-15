import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './NonVeg.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NonVeg() {
  const productObjects = useSelector(globalState => globalState.products.nonveg);
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
    <li key={index} className="nonveg-product-card">
      <img src={product.image} alt={product.name} className="nonveg-product-image" />
      <div className="nonveg-product-info">
        <h3 className="nonveg-product-name">{product.name}</h3>
        <p className="nonveg-product-price">${product.price}</p>
        <p className="nonveg-product-description">{product.description}</p>
      </div>
      <button
        className="nonveg-add-cart-button"
        onClick={() => {dispatch(AddToCart(product));toast.success(`${product.name} added to cart!!!`);}}
      >
        Add To Cart
      </button>
    </li>
  ));



  return (
    <div className="nonveg-fullscreen-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="nonveg-container">
        <h1 className="nonveg-page-title">Non-Veg Products</h1>

        <ol className="nonveg-product-list">
          {productListItems}
        </ol>

        <div className="nonveg-pagination-buttons">
          <button
            className="nonveg-page-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`nonveg-page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="nonveg-page-button"
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

export default NonVeg;
