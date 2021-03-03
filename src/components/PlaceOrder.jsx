import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/PlaceOrder.css'
import DeliveryDetails from '../components/DeliveryDetails'
import axios from "axios";
import Subtotal from '../components/Subtotal';

function PlaceOrder ()
{  
    const history = useHistory();  
    const [{basket}, dispatch] = useStateValue();
    let imgSrc="../logo2.PNG";

    const tabRow = basket
    .map((row, index) => {     
    return (    
    <tr key={index}> 
        <td>
                       <div className="row">
                            <div className="card col-sm-2 cardWidth">
                                <img className="card-img-top rounded mx-auto d-block product__img" src={imgSrc} alt="product" />
                            </div>
                            <div className="card-body col-sm-10">
                                <h5 className="card-title">{row.ProductName}</h5>
                                <p className="card-text">{row.Description}</p>
                            </div>
                        </div>
        </td>
        <td>{row.Price}</td>                           
    </tr>
    )
    })
    
    function handleSubmit (delivery)     
    {    
       if(delivery.ZipCode.length>0)
       {
            const order = {
                "ProductInCart" : basket,
                "Delivery": delivery
            };
    
            dispatch({
                type: 'SET_DELIVERY',
                delivery: delivery                 
                }) 
        
            axios({
                method: 'post',
                url: 'https://localhost:44392/api/WebShopAPI/PlaceOrder',
                data: JSON.stringify(order),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
            })
            .then(response => 
            {           
            dispatch({
                type: 'ORDER_PLACED',
                orderHeader: {
                                OrderID: response.data.orderID,
                                CustomerID: response.data.customerID,
                                OrderStatus: response.data.orderStatus,
                                PaymentStatus: response.data.paymentStatus
                            }
                    
                })     

            history.push('/Payment');
                        
            })
            .catch(error => 
            {
                // handle error
                console.log("Error", error);
            })
            .then(() => 
            {
                // always executed
                
            });
       } 
            
    }; 


    return (
        <div class="placeOrder__info">
            <div className="row">
                <div className="col-sm-12">
                    <table class="table table-hover">
                                <thead class="thead-dark">  
                                    <tr>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    </tr>
                            </thead>   
                            <tbody>{tabRow}</tbody>           
                    </table>  
                </div>                 
            </div>
            <div>
                 <Subtotal showButton="false" />
            </div>
            <hr/>
            <div>
                <DeliveryDetails handleSubmit={handleSubmit}/>
            </div> 
        </div>
    )
}

export default PlaceOrder