import cartimg from './assets/icon-add-to-cart.svg';
import addbtn from './assets/icon-decrement-quantity.svg';
import subtn from './assets/icon-increment-quantity.svg';

const Productpage = ({
  id,
  image,
  name,
  category,
  price,
  showAddButton,
  quantity,
  onAddToCart,
  onQuantityChange
}) => {
  const handleAddClick = (e) => {
    e.stopPropagation(); // Crucial fix
    onAddToCart(id);
  };

  const handleQuantityClick = (e, change) => {
    e.stopPropagation(); // Crucial fix
    onQuantityChange(change);
  };

  return (
    <div className="col-12 justify-content-sm-center col-md-3 col-lg-3 image_box">
      {/* Product images */}
      <img src={image.desktop} alt={name} className="d-none d-md-none d-lg-block"/>
      <img src={image.tablet} alt={name} className="d-none d-md-block d-lg-none"/>
      <img src={image.mobile} alt={name} className="d-block d-md-none d-lg-none"/>
      
      {/* Cart buttons */}
      <div className="btn d-flex justify-content-center">
        {/* Add to Cart Button */}
        {showAddButton && (
          <button 
            className="btn_active justify-content-center visible"
            onClick={handleAddClick}
          >
            <img src={cartimg} alt="Add to cart icon"/>
            Add to Cart
          </button>
        )}
        
        {/* Quantity Controls */}
        {!showAddButton && (
          <div className="d-flex justify-content-between align-items-center btn_inactive visible">
            <img 
              src={addbtn}
              alt="Decrease quantity"
              onClick={(e) => handleQuantityClick(e, -1)}
              style={{ cursor: 'pointer' }}
            />
            <span>{quantity}</span>
            <img 
              src={subtn}
              alt="Increase quantity"
              onClick={(e) => handleQuantityClick(e, 1)}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
      
      {/* Product info */}
      <div className="text_area">
        <p>{category}</p>
        <h6>{name}</h6>
        <h4>${price}</h4>
      </div>
    </div>
  );
};

export default Productpage;