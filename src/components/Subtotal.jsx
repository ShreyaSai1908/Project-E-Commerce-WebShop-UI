import React from 'react';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/Subtotal.css';

function Subtotal ({showButton})
{    
       const getCartTotal = (basket) => 
       basket?.reduce((amount,item) => parseFloat(item.Price) + amount,0);

       const [{basket},dispatch] = useStateValue();
       const history = useHistory();  
       
       function placeOrder ()  {
        
          history.push('/PlaceOrder');
       }  

       return(
           <div className="subtotal">
              <CurrencyFormat
                   renderText={(value)=>(
                      <p>
                         Total ({basket.length} items) : <strong>{`${value}`}</strong>
                      </p>
                    )
                  }
                 decimalScale={2}
                 value= {getCartTotal(basket)}
                 displayType={"text"}
                 thousandSeparator={true}
                 prefix = {"$"}
              />
              {
                 showButton ==="true" && (
                   <button className="subtotal_button" onClick={placeOrder}>Proceed to Checkout</button>   
                 ) 
              }
                
                            
           </div>
           
        )
    
}

export default Subtotal;