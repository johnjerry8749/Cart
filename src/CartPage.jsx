import Imgactive from './assets/illustration-empty-cart.svg';

const CartPage = ({ cartItems, onRemoveFromCart}) => {
  const cartTotal = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="p-3 cartpage">
      <div className="cartheader d-flex justify-content-between align-items-center ">
           <h4 className="m-2">Your Cart ({cartTotal})</h4>
           
      </div>
     
      
      {cartItems.length === 0 ? (
        // Empty cart state
        <>
          <img src={Imgactive} className="img-fluid w-55 mx-auto d-block mt-5" alt="Empty cart" />
          <p className="text-center">Your added items will appear here</p>
        </>
      ) : (
        // Cart with items
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item d-flex align-items-center mb-3">
              <img 
                src={item.image.mobile} 
                alt={item.name} 
                className="cart-item-img me-3"
                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                
              />
              <div className="cart-item-details flex-grow-1">
                <h6 className="mb-1">{item.name}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span>${item.price} × {item.quantity}</span>
                  <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
               <h5 className='clear_cart' onClick={() => onRemoveFromCart(item.id)}>x</h5>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-total mt-3 pt-3 border-top">
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Total:</span>
              <span className="fw-bold">${cartTotalPrice.toFixed(2)}</span>
            </div>
            <button className="btn btn-primary w-100 mt-3">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;