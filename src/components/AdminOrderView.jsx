import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/AdminOrderView.css'
import axios from "axios";
import { useEffect } from 'react';

function AdminOrderView ()
{ 
    const [{basket,loggedInUser,customerID,adminOrderList}, dispatch] = useStateValue();
    

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
                    type: 'SET_ADMIN_ORDER_LIST',
                    adminOrderList: response.data,                    
                }) 
                console.log(response.data)
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

    var tabRow = adminOrderList
    .map((row, index) => {     
    return (    
    <tr key={index}> 
        <td>{row.orderID}</td>
        <td>{row.customerID}</td>
        <td>{row.createDate}</td>
        <td>{row.orderStatus}</td>  
        <td>{row.paymentStatus}</td>  
    </tr>
    )
    })

    return (
        <div className="row orderViewContent">
                <div className="col-sm-12">
                    <table class="table table-hover">
                                <thead class="thead-dark">  
                                    <tr>
                                        <th scope="col">Order#</th>
                                        <th scope="col">Customer#</th>
                                        <th scope="col">Create Date</th>
                                        <th scope="col">Order Status</th>
                                        <th scope="col">Payment Status</th>
                                    </tr>
                            </thead>   
                            <tbody>{tabRow}</tbody>           
                    </table>  
                </div>                 
            </div> 
    )
}

export default AdminOrderView;