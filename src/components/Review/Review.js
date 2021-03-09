import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Header/Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handlePlaceOrder = () =>{
        setCart([]);
        setOrderPlaced(true)
        processOrder();
    }

    const removeProduct = (productKey)=>{
        const newCart = cart.filter(pd => pd.key !==productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() =>{
        // cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        
        const cartProducts = productKeys.map(key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = savedCart[key];
            return product;
        });
       setCart(cartProducts);
    }, []);

   let thankyou;
    if(orderPlaced){
       thankyou = <img src={happyImage} alt=""/>
    }
  
    return (
        <div className="twin-container">
           <div className="product-container">
           {
               cart.map(pd => <ReviewItem
                key ={pd.key}
                removeProduct={removeProduct}
                product ={pd}></ReviewItem>)
           }
            {thankyou}
           
           </div>
           <div className="cart-container">
           <Cart cart={cart}>
               <button onClick={handlePlaceOrder }className="main-button">Place order</button>
           </Cart>
           </div>
        </div>
    );
};

export default Review;