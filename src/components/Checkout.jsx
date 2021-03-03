import React from 'react';
import '../customCSS/Checkout.css';
import {useStateValue} from '../components/StateProvider';
import Subtotal from './Subtotal';
import ProductCart from './ProductCart'
import { Link } from 'react-router-dom';

function Checkout ()
{    
       const [{basket}] = useStateValue();
       return(
           <div className="checkout">
              <div className="checkout__left">
                  {
                      basket.length === 0 ?(
                            <div>
                                <div>
                                    <h2 className="checkout__title">Empty Shopping Cart!</h2> 
                                    <p>You have no products in your cart.</p>  
                                </div>
                                <div>
                                    <Link to="/">
                                        <p>Continue Shopping</p>
                                    </Link> 
                                </div>                                                                
                            </div>
                            
                        ) : (
                            <div>
                                    <div>
                                        <h2 className="checkout__title2">Items in the Cart</h2>
                                        {
                                            basket.map(item =>(
                                                            <ProductCart
                                                                productID={item.ProductID}
                                                                productName={item.ProductName}
                                                                price={item.Price}
                                                                desc={item.Description}
                                                            />
                                                            )
                                                    )
                                        }
                                    </div>
                                    <div>
                                        <Link to="/">
                                            <p>Continue Shopping</p>
                                        </Link> 
                                    </div>  
                            </div>
                        )
                  }

                  
              </div>
              {
                  basket.length>0 && (
                    <div className="checkout__right">
                       <Subtotal showButton="true"/>
                    </div>
                  )
              }           
           </div>
           
        )
    
}

export default Checkout;