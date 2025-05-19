import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Alcohol.css'; // Updated CSS import
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Alcohol() {
  const productObjects = useSelector(globalState => globalState.products.alcohol); // Updated selector
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
    <li key={index} className="alcohol-product-card">
      <img src={product.image} alt={product.name} className="alcohol-product-image" />
      <div className="alcohol-product-info">
        <h3 className="alcohol-product-name">{product.name}</h3>
        <p className="alcohol-product-price">${product.price}</p>
        <p className="alcohol-product-description">{product.description}</p>
      </div>
      <button
        className="alcohol-add-cart-button"
        onClick={() => {
          dispatch(AddToCart(product));
          toast.success(`${product.name} added to cart!`);
        }}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="alcohol-fullscreen-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="alcohol-container">
        <h1 className="alcohol-page-title">Alcohol Products</h1>

        <ol className="alcohol-product-list">
          {productListItems}
        </ol>

        <div className="alcohol-pagination-buttons">
          <button
            className="alcohol-page-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`alcohol-page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="alcohol-page-button"
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

export default Alcohol;
