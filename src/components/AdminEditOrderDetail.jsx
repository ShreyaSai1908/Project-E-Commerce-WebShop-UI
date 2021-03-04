import React,{ useState } from 'react';
import '../customCSS/AdminOrderView.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function AdminEditOrderDetail()
{
    const history = useHistory();  
    const [{editOrderDetail}, dispatch] = useStateValue();


     const [productName, setProductName] = useState(editOrderDetail.product.productName);
     const [productQuantity, setProductQuantity] = useState(editOrderDetail.productQuantity);
    

      const doEditOrder = (event) => 
      {
         event.preventDefault(); 
         const form={
                      OrderDetailID:editOrderDetail.orderDetailID,
                      OrderHeaderID: editOrderDetail.orderHeader.orderID,                                    
                      ProductID: editOrderDetail.product.productID,
                      ProductQuantity:parseInt(productQuantity,10)                 
                     };
          console.log(form);           
        
         axios({
            method: 'post',
            url: 'https://localhost:44392/api/WebShopAPI/EditOrderDetailLine',
            data: form
          })
          .then(response => 
          {       
              // handle success  
              if (response.status===200)
              {    
                console.log("OrderLine Edited");
                history.push("/AdminOrders");
              } 
                    
          })
          .catch(error => 
          {
            // handle error
            console.log("OrderDetail cannot be edited:", error);
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
                                <label htmlFor="productName" class="control-label">Product Name</label>
                                <input class="form-control" type="text" name="productName" id="form-productName" value={productName} onChange={e => setProductName(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="productQuantity"  class="control-label">Quantity</label>
                                <input class="form-control" type="text" name="productQuantity" id="form-productQuantity" value={productQuantity} onChange={e => setProductQuantity(e.target.value)}/>
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

export default AdminEditOrderDetail;