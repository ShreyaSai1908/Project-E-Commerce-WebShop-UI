import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/PlaceOrder.css'
import axios from "axios";
import { useEffect } from 'react';
import OrderDetailView from '../components/OrderDetailView';

function OrderView ()
{ 
    const history = useHistory();  
    const [{basket,loggedInUser,customerID,custOrderList}, dispatch] = useStateValue();
    const homerURL= "/LoginSuccess/?userName=" + loggedInUser+"&customerID="+customerID;  
    
    useEffect(() =>     
    {   
           axios.get("https://localhost:44392/api/WebShopAPI/GetOrders", 
           {
                params: {
                customerID: customerID
                }
          })
          .then(response => 
          {  
              // handle success  
              if (response.status===200)
              {  
                dispatch({
                    type: 'SET_CUSTORDER_LIST',
                    custOrderList: response.data,
                }) 
              }                     
          })
          .catch(error => 
          {
                // handle error
                console.log("Error fetching orders:", error);
          })
          .then((response) => 
          {
            // always executed     
          });    
        
    },[]);
    
    const getOrderDetails = (orderID) => 
    {
        axios.get("https://localhost:44392/api/WebShopAPI/GetOrderDetails", 
           {
                params: {
                orderID: orderID
                }
          })
          .then(response => 
          {       
              // handle success  
              if (response.status===200)
              { 
                //productList =Array.from(response.data);                 
                //console.log(productList);
                dispatch({
                    type: 'SET_CUSTORDER_DETAIL',
                    custOrderDetail: response.data,
                }) 

              }                     
          })
          .catch(error => 
          {
                // handle error
                console.log("Error fetching orders:", error);
          })
          .then((response) => 
          {
            // always executed     
          });  
      
    }

    var tabRow = custOrderList
    .map((row, index) => {     
    return (    
    <tr key={index}> 
        <td>{row.orderID}</td>
        <td>{row.customerID}</td>
        <td>{row.createDate}</td>
        <td>{row.orderStatus}</td>  
        <td>{row.paymentStatus}</td>      
        <td>
              <a  className="btn btn-primary" 
                  href={"#order-detail-section"} 
                  data-toggle="collapse" 
                  onClick={() => {
                                   getOrderDetails(row.orderID)
                                 }
                  }> 
                  Details
              </a>  
        </td>  
    </tr>
    )
    })

    return(
        <div class="placeOrder__info">
            <div className="row">
                <div className="col-sm-12">
                    <table class="table table-hover">
                                <thead class="thead-dark">  
                                    <tr>
                                        <th scope="col">Order#</th>
                                        <th scope="col">Customer#</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Payment Status</th>
                                        <th scope="col"></th>
                                    </tr>
                            </thead>   
                            <tbody>{tabRow}</tbody>           
                    </table>  
                </div>                 
            </div>   
            <hr/>
            <div id="order-detail-section" className="row collapse">
               <div className="col-sm-12">
                      <OrderDetailView/>
               </div>
            </div>
            <br/>
            <div className="row">    
                <div className="col-sm-12">                                 
                    <Link to={homerURL}>
                        <p>Continue Shopping</p>
                    </Link> 
                </div>   
            </div>      
       </div>
    )
}

export default OrderView;