import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/PlaceOrder.css'
import axios from "axios";
import { useEffect } from 'react';

function AdminOrderDetailView ()
{ 
    const history = useHistory();  
    const [{basket,loggedInUser,customerID,custOrderList,custOrderDetail}, dispatch] = useStateValue();  
    let imgSrc="../logo2.PNG";
    
    //const orderDetailList=Array.from(orderDetail)
    //const [{orderDetailID, orderHeader, product, productQuantity}]=Array.from(orderDetail);
    //console.log("Order detail View=",orderDetail)  

    const doEditOrderdetail= (orderDetail) => 
    {
        dispatch({
            type: 'EDIT_ORDER_DETAIL',
            editOrderDetail: orderDetail
        }) 
        history.push("/EditOrderDetail");
        
    }

    const deleteOrderdetail = (orderDetailID) => 
    {            
        axios.get("https://localhost:44392/api/WebShopAPI/DeleteOrderDetailLine", 
        {
                params: {
                 orderDetailID: orderDetailID
                }
        })         
        .then(response => 
        {       
            // handle success  
            if (response.status===200)
            { 
                //productList =Array.from(response.data);                 
                console.log("Order Line Deleted");  
                history.push("/AdminOrders");
            }                     
        })
        .catch(error => 
        {
                // handle error
                console.log("Error deleting order line:", error);
        })
        .then((response) => 
        {
            // always executed     
        });  
    
    }

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
                        <a href="#" onClick={() => {
                                                      doEditOrderdetail(row)
                                                    }
                                            }>Edit</a>
                        <span> | </span>
                        <a href="#" onClick={() => {
                                                      deleteOrderdetail(row.orderDetailID)
                                                    }
                                            }>Delete</a>
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

export default AdminOrderDetailView