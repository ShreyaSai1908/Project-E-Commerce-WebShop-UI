import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/Payment.css'
import Subtotal from '../components/Subtotal';

function Payment ()
{  
    const history = useHistory();  
    const [{basket,orderHeader, delivery}, dispatch] = useStateValue();
    const paypal = useRef();

    

    const purchase_units=basket.map((row, index) => {     
            return ( 
                {
                    description:row.ProductName,
                    amount: {
                      currency_code: "USD",
                      value: row.Price,
                    },
                  }

            )
     })
    

    console.log(purchase_units)

    useEffect(() => {
        window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units:  [
                    {
                      description: "RS Webshop",
                      amount: {
                        currency_code: "USD",
                        value: getCartTotal(basket),
                      },
                    },
                  ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              history.push("/PaymentSuccess");
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current);
      }, []);

    const getCartTotal = (basket) => 
       basket?.reduce((amount,item) => parseFloat(item.Price) + amount,0);

    return (
        <div className="orderHeader__info">
            <div class="row"> 
                <div class="col-sm-12">
                    <table class="table table-hover ">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Order #</th>
                                <th scope="col">Customer #</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                                <tr>
                                    <td>{orderHeader.OrderID}</td>
                                    <td>{orderHeader.CustomerID}</td>
                                    <td>{orderHeader.OrderStatus}</td>
                                </tr>                            
                        </tbody>
                    </table>
                </div>
            </div>
            <hr />
            <div class="row">
            <div class="card col-sm-8 cardWidth" >                
                <div class="card-body">
                    <h3 class="card-title">Delivery Details</h3>
                    <p class="card-text"><h5>{delivery.Name}</h5></p>
                    <p class="card-text">{delivery.Address}</p>
                    <p class="card-text">{delivery.City}</p>
                    <p class="card-text">{delivery.ZipCode}</p>
                    <p class="card-text"><h5>{delivery.PhoneNumber}</h5></p>
                </div>
            </div>
            <div class="card col-sm-4 cardWidth">
                <div class="card-body">
                    <div class="row">
                        <div class="col text-left">
                            <h5 class="card-title text-info">Total</h5>
                        </div>                                           
                        <div class="col text-right">                            
                            <h4 class="card-title text-primary"><small>$</small>{getCartTotal(basket)}</h4>                            
                        </div>
                    </div>    
                    <hr />
                    <div>
                         <div ref={paypal}></div>
                    </div>
                </div>
            </div>
    </div>          
        </div>
    )
}

export default Payment