import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Milk.css'; // Scoped CSS
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Milk() {
  const productObjects = useSelector(globalState => globalState.products.milk);
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
    <li key={index} className="milk-product-card">
      <img src={product.image} alt={product.name} className="milk-product-image" />
      <div className="milk-product-info">
        <h3 className="milk-product-name">{product.name}</h3>
        <p className="milk-product-price">${product.price}</p>
        <p className="milk-product-description">{product.description}</p>
      </div>
      <button
        className="milk-add-cart-button"
        onClick={() => {dispatch(AddToCart(product));toast.success(`${product.name} added to cart!!!`);}}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="milk-fullscreen-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="milk-container">
        <h1 className="milk-page-title">Milk Products</h1>

        <ol className="milk-product-list">
          {productListItems}
        </ol>

        <div className="milk-pagination-buttons">
          <button
            className="milk-page-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`milk-page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="milk-page-button"
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

export default Milk;
