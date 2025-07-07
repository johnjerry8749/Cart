import React, { useEffect, useState } from "react";
import Productpage from "./Productpage";
import CartPage from "./CartPage";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => setProducts(data.map(product => ({
        ...product,
        showAddButton: true,
        quantity: 1
      }))))
      .catch(error => console.error("Fetch error:", error));
  }, []);

 const handleAddToCart = (productId) => {
  // Prevent duplicate adds
  const alreadyInCart = cartItems.some(item => item.id === productId);
  if (alreadyInCart) return;

  setProducts(prevProducts => 
    prevProducts.map(product =>
      product.id === productId
        ? { ...product, showAddButton: false }
        : product
    )
  );
  
  const productToAdd = products.find(p => p.id === productId);
  if (productToAdd) {
    setCartItems(prev => [...prev, { 
      ...productToAdd, 
      quantity: 1,
      showAddButton: false 
    }]);
  }
};

const handleRemoveFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId
          ? { ...product, showAddButton: true, quantity: 1 }
          : product
      )
    );
};

  const handleQuantityChange = (productId, change) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const newQuantity = product.quantity + change;
          
          if (newQuantity < 1) {
            // Remove from cart if quantity goes to 0
            setCartItems(prev => prev.filter(item => item.id !== productId));
            return { ...product, showAddButton: true, quantity: 1 };
          } else {
            // Update cart quantity
            setCartItems(prev => 
              prev.map(item =>
                item.id === productId
                  ? { ...item, quantity: newQuantity }
                  : item
              )
            );
            return { ...product, quantity: newQuantity };
          }
        }
        return product;
      })
    );
  };

  return (
    <div className="container-fluid">
      <h3 className="p-3 mt-4 ms-5">Dessert</h3>
      <div className="product_box d-block d-md-flex">
        <div className="row d-flex d-md-flex p-2 gap-3 justify-content-center content_box">
          {products.map((product) => (
            <Productpage 
              key={product.id}
              id={product.id}
              image={product.image} 
              name={product.name}
              category={product.category}
              price={product.price}
              showAddButton={product.showAddButton}
              quantity={product.quantity}
              onAddToCart={() => handleAddToCart(product.id)}
              onQuantityChange={(change) => handleQuantityChange(product.id, change)}
            />
          ))}
        </div>
        <CartPage
         cartItems={cartItems} 
         onRemoveFromCart ={handleRemoveFromCart}
  
         />
      </div>
    </div>
  );
};

export default App;