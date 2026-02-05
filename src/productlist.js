import React, { useState, useEffect, useRef } from 'react';
import { useGetItemsQuery } from "./store/apiSlice";
import styles from "./productlist.module.css"
import Modal from './productModal';

export default function ProductItemsPage() {
     const { data, isLoading, isError, error } = useGetItemsQuery({
    limit: 20,
  });
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
 const [cards, setCards] = useState([]);
    const dragItem = useRef(null); // Ref to store the index of the dragged item
    const dragOverItem = useRef(null); // Ref to store the index of the item being dragged over
  
    // Load cards from session storage on initial mount
    useEffect(() => {
      const storedCards = sessionStorage.getItem('sortedCards');
      if (storedCards) {
        setCards(JSON.parse(storedCards));
      }
    }, []);
  
    // Function to handle the drag start event
    const handleDragStart = (e, index) => {
      dragItem.current = index;
      // Optional: Add visual feedback (e.g., a slight delay or class change)
      e.dataTransfer.effectAllowed = 'move';
    };
  
    // Function to handle the drag over event
    const handleDragOver = (e, index) => {
      e.preventDefault(); // Essential to allow a drop
      dragOverItem.current = index;
    };
  
    // Function to handle the drop event
    const handleDrop = () => {
      const updatedCards = [...cards];
      const [draggedItemContent] = updatedCards.splice(dragItem.current, 1);
      updatedCards.splice(dragOverItem.current, 0, draggedItemContent);
  
      // Update state and session storage
      setCards(updatedCards);
      sessionStorage.setItem('sortedCards', JSON.stringify(updatedCards));
  
      // Reset the refs
      dragItem.current = null;
      dragOverItem.current = null;
    };
 

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <p>{error?.data?.error || "Something went wrong"}</p>;

  const items = Array.isArray(data) ? data : data.items;
   const fetchProductDetails = async (productId) => {
    try {
      setSelectedProduct(items[productId - 1])
      setIsModalOpen(true); 
    } catch (err) {
     //
    }
  };

  
  

  const closeModal = () => {
     setIsModalOpen(false);
     setSelectedProduct(null);
  }

   const handleProductClick = (productId) => {
    fetchProductDetails(productId);
    setIsModalOpen(true)
  };

   
  return (
    <div>
        <section className={styles.grid} aria-label="Products">
        {items.map((item) => (
        <div key={item.id} onClick={() => handleProductClick(item.id)} 
             draggable 
            onDragStart={(e) => handleDragStart(e, item.id)}
            onDragOver={(e) => handleDragOver(e, item.id)}
            onDrop={handleDrop}
            onDragEnd={handleDrop} 
        >
            <a className={styles.Pcard} href="#">
            <div  className={styles.media} >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </div>
            <div   className={styles.meta}>
              <p  className={styles.name}>{item.title}</p>
              <p  className={styles.price}>${item.price}</p>
            </div>
          </a>
        </div>
      ))}
        
        </section>
         {isModalOpen && selectedProduct && (
     <Modal isOpen={isModalOpen} onClose={closeModal}  productData={selectedProduct}></Modal>
         )}
    </div>
  );
}
