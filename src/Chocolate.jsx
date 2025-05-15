import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToCart } from './store';
import './Chocolate.css'; // Scoped CSS
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Chocolate() {
  const productObjects = useSelector(globalState => globalState.products.chocolate);
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
    <li key={index} className="choco-product-card">
      <img src={product.image} alt={product.name} className="choco-product-image" />
      <div className="choco-product-info">
        <h3 className="choco-product-name">{product.name}</h3>
        <p className="choco-product-price">${product.price}</p>
      </div>
      <button
        className="choco-add-cart-button"
        onClick={() => {dispatch(AddToCart(product));toast.success(`${product.name} added to cart!!!`);}}
      >
        Add To Cart
      </button>
    </li>
  ));

  return (
    <div className="choco-fullscreen-wrapper">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="choco-container">
        <h1 className="choco-page-title">Chocolates</h1>
        <ol className="choco-product-list">
          {productListItems}
        </ol>

        <div className="choco-pagination-buttons">
          <button
            className="choco-page-button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`choco-page-button ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="choco-page-button"
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

export default Chocolate;
