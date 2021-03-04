import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/PlaceOrder.css'
import axios from "axios";
import { useEffect } from 'react';

function OrderDetailView ()
{ 
    const history = useHistory();  
    const [{loggedInUser,customerID,custOrderList,custOrderDetail}, dispatch] = useStateValue();  
    let imgSrc="../logo2.PNG";
    
    console.log("User->OrderdetailView->loggedInuser",loggedInUser);

    //const orderDetailList=Array.from(orderDetail)
    //const [{orderDetailID, orderHeader, product, productQuantity}]=Array.from(orderDetail);
    //console.log("Order detail View=",orderDetail)  

    const orderDetailRows = custOrderDetail
    .map((row, index) => {         
    return ( 
          <div className="row">
                <div className="card col-sm-2 cardWidth">
                    <img className="card-img-top rounded mx-auto d-block product__img" src={imgSrc} alt="product" />
                </div>
                <div className="card-body col-sm-6">
                        <h5 className="card-title">{row.product.productName}</h5>
                        <p className="card-text">{row.product.description}</p>
                </div>                 
                <div className="col-sm-4">
                    <p><small>Price:$</small>{row.product.price}</p>
                    <p><small>Quantity:</small>{row.productQuantity}</p> 
                </div>  
          </div>
         )
    })

    

    return (
       <div>{orderDetailRows}</div> 
    )
}

export default OrderDetailView