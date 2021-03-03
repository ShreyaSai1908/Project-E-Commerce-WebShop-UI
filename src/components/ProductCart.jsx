import React from 'react';
import '../customCSS/ProductCart.css';
import {useStateValue} from '../components/StateProvider';


function ProductCart({productID,productName,price,desc}){

    const [{basket}, dispatch] = useStateValue();
    
    const removeItem=(event)=>{
        event.preventDefault(); 
        dispatch({
            type: 'REMOVE_FROM_CART',
            ProductID: productID
        })
    }

    let  imgSrc="../logo2.PNG";

    return (
          <div className="productCart">
              <img className="productCart__image" src={imgSrc} alt="Product"/>
              <div className="productCart__info">
                  <p className="productCart__title">{productName}</p>
                  <p className="productCart__desc">{desc}</p>
                  <p className="productCart__price">
                    <small>$</small> 
                    <strong>{price}</strong> 
                  </p>
                  <button onClick={removeItem}>Remove from the Cart</button>
              </div>              
          </div>
         
    )
}

export default ProductCart;
