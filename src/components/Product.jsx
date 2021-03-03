import React from 'react';
import '../customCSS/Product.css';
import {useStateValue} from '../components/StateProvider';
 

function Product ({productID,productName,price,desc})
{       
     
       const [{basket}, dispatch]= useStateValue()
       const addToCart = () => {
             dispatch({
                type: 'ADD_TO_BASKET',
                item: {
                        ProductID: productID,
                        ProductName: productName,
                        Price: price,
                        Description: desc
                      }
                     
             })                      
        };

        
        let  imgSrc="../logo2.PNG";
        let productImgID='productImg-'+productID;
        let productBtnAddToCartID='productBtnAddToCart-'+productID;
        return(
           <div className="product">
              <div className="product__info">
                 <h5>{productName}</h5> 
                 <p>{desc}</p>
                 <p className="product__price"></p>
                 <small>$</small>
                 <strong>{price}</strong>
               </div>    
               <img id={productImgID} src={imgSrc} alt="product"/>
               <button id={productBtnAddToCartID} onClick={addToCart}>Add to Cart</button>
           </div>
           
        )
    
}

export default Product;