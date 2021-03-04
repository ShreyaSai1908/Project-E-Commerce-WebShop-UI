import React,{ useState } from 'react';
import '../customCSS/AdminOrderView.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function AdminEditOrder()
{
    const history = useHistory();  
    const [{editOrderHeader}, dispatch] = useStateValue();

    const [orderStatus, setOrderStatus] = useState(editOrderHeader.orderStatus);
    const [paymentStatus, setPaymentStatus] = useState(editOrderHeader.paymentStatus);
    

      const doEditOrder = (event) => 
      {
         event.preventDefault(); 
         const form={
                      orderID:editOrderHeader.orderID,
                      customerID: editOrderHeader.customerID,
                      orderStatus:orderStatus,
                      paymentStatus:paymentStatus,
                      createDate: editOrderHeader.createDate                   
                     };
          console.log(form);           
        
         axios({
            method: 'post',
            url: 'https://localhost:44392/api/WebShopAPI/EditOrderHeader',
            data: form
          })
          .then(response => 
          {       
              // handle success  
              if (response.status===200)
              {    
                console.log("Product Edited");
                history.push("/AdminOrders");
              } 
                    
          })
          .catch(error => 
          {
            // handle error
            console.log("Product cannot be edited:", error);
          })
          .then((response) => 
          {
            // always executed              
          });   
         
      }

        return (
            <div className="editOrderHeaderView">
                <div class="row">
                    <div class="col-md-4">
                        <form>
                            <div class="form-group">
                                <label htmlFor="orderStatus" class="control-label">Order Status</label>
                                <input class="form-control" type="text" name="orderStatus" id="form-orderStatus" value={orderStatus} onChange={e => setOrderStatus(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="paymentStatus"  class="control-label">Payment Status</label>
                                <textarea class="form-control" name="paymentStatus" id="form-paymentStatus" value={paymentStatus} onChange={e => setPaymentStatus(e.target.value)}></textarea>
                            </div>
                            <div class="form-group">
                                <button  class="btn btn-primary" onClick={doEditOrder}>Edit</button>
                            </div>
                        </form>
                    </div>
                </div>           
            </div>
            
        )

}

export default AdminEditOrder;