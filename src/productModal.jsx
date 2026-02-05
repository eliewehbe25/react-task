// Modal.jsx
import React from 'react';
import styles from "./productModal.module.css"; // Create this CSS file next
import star from './assets/star.png';

const Modal = ({ isOpen, onClose, children , productData }) => {
  if (!isOpen) return null;

  // Prevents the modal from closing when clicking inside the content area
  const handleContentClick = (e) => {
    e.stopPropagation();
  };
  console.log("prod", productData)

  return (
    // Backdrop - clicking this closes the modal
    <div className={styles.modalbackdrop} onClick={onClose}>
      {/* Modal content container */}
     
      <div className={styles.modalcontent} onClick={handleContentClick}>
         <div>
         <h2>{productData.title}</h2>
         <div className={styles.media} >
              <img
                src={productData.image}
                alt={productData.title}
                loading="lazy"
              />
            </div>
            <div className={styles.ratingContainer}>
              <span className={styles.ratingTitle}>Rating: {productData.rating.rate} <img  src={star} width={12} height={12}/>  / Count: {productData.rating.count}  </span>
            </div>
            <div className={styles.categoriesContainer}>
                <span className={styles.categoriesTitle}>Category:</span>
                <span>{productData.category}.</span>
            </div>
            <div className={styles.descriptionContainer}>
                <span className={styles.DescriptionTitle}>Decription:</span>
                <span>{productData.description}.</span>
            </div>
      </div>
        <button className={styles.modalclosebtn} onClick={onClose}>
          &times; {/* This is an 'X' character */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
