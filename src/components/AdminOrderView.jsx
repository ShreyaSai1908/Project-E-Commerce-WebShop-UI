import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/AdminOrderView.css'
import axios from "axios";
import { useEffect } from 'react';
import AdminOrderDetailView from '../components/AdminOrderDetailView';

function AdminOrderView ()
{ 
    const history = useHistory();  
    const [{basket,loggedInUser,customerID,adminOrderList,editOrderHeader}, dispatch] = useStateValue();
    const homerURL= "/LoginSuccess/?userName=" + loggedInUser+"&customerID="+customerID; 

    useEffect(() => 
    {   
           axios.get("https://localhost:44392/api/WebShopAPI/GetOrdersForAdmin")           
           .then(response => 
          {       
              // handle success  
              if (response.status===200)
              {  
                dispatch({
                    type: 'SET_ADMIN_ORDER_LIST',
                    adminOrderList: response.data,                    
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
        
      },adminOrderList);

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

      const doEditOrderHeader = (order) => 
      {
        dispatch({
            type: 'EDIT_ORDER_HEADER',
            editOrderHeader: order
        }) 
        history.push("/EditOrder");
        
      }

      const deleteOrderHeader = (orderID) => 
      {            
            axios.get("https://localhost:44392/api/WebShopAPI/DeleteOrderHeader", 
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
                    console.log("Order Deleted");  
                    history.push("/AdminOrders");
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

    var tabRow = adminOrderList
    .map((row, index) => {     
    return (    
    <tr key={index}> 
        <td>{row.orderID}</td>
        <td>{row.customerID}</td>
        <td>{row.createDate}</td>
        <td>{row.orderStatus}</td>  
        <td>{row.paymentStatus}</td>
        <td>
              <a   
                  href="#order-detail-section"
                  data-toggle="collapse" 
                  onClick={() => {
                                   getOrderDetails(row.orderID)
                                 }
                  }> 
                  Details
              </a> <span> | </span>
              <a   
                  href="#"
                  onClick={() => {
                                   doEditOrderHeader(row)
                                 }
                  }> 
                  Edit
              </a> <span> | </span>
              <a   
                  href="#"
                  onClick={() => {
                                   deleteOrderHeader(row.orderID)
                                 }
                  }> 
                  Delete
              </a>
        </td>    
    </tr>
    )
    })

    return (
        <div className="orderViewContent">
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
                                                    <th scope="col"> </th>
                                                </tr>
                                        </thead>   
                                        <tbody>{tabRow}</tbody>           
                                </table>  
                           </div> 
                </div>     
                <hr/>
                <div id="order-detail-section" className="row collapse">
                <div className="col-sm-12">
                        <AdminOrderDetailView/>
                </div>
                </div>                                   
         </div> 
            
    )
}

export default AdminOrderView;