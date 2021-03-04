import React,{ useState } from 'react';
import '../customCSS/AdminProductView.css';
import { Link } from 'react-router-dom';
import axios from "axios";
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function AdminEditProduct()
{
    const history = useHistory();  
    const [{editProduct}, dispatch] = useStateValue();

    const [ProductID, setProductID] = useState(editProduct.productID);
    const [ProductName, setProductName] = useState(editProduct.productName);
    const [Price, setPrice] = useState(editProduct.price);
    const [Description, setDescription] = useState(editProduct.description);
    

      const doEditProduct = (event) => 
      {
         event.preventDefault(); 
         const form={
                      productID:ProductID,
                      productName: ProductName,
                      price:Price,
                      description:Description                   
                     };
        
         axios({
            method: 'post',
            url: 'https://localhost:44392/api/WebShopAPI/EditProduct',
            data: form
          })
          .then(response => 
          {       
              // handle success  
              if (response.status===200)
              {    
                console.log("Product Edited");
                history.push("/AdminProducts")
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
            <div className="adminEditProduct">
                <div class="row">
                    <div class="col-md-4">
                        <form>
                            <div class="form-group">
                                <label htmlFor="ProductName" class="control-label">Name</label>
                                <input class="form-control" type="text" name="ProductName" id="form-ProductName" value={ProductName} onChange={e => setProductName(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="Description"  class="control-label">Description</label>
                                <textarea class="form-control" name="Description" id="form-Description" value={Description} onChange={e => setDescription(e.target.value)}></textarea>
                            </div>
                            <div class="form-group">
                                <label htmlFor="Price"  class="control-label">Price</label>
                                <input class="form-control" name="Price" id="form-Price" value={Price} onChange={e => setPrice(e.target.value)}/>
                            </div>
                            <div class="form-group">
                                <button  class="btn btn-primary" onClick={doEditProduct}>Edit</button>
                            </div>
                        </form>
                    </div>
                </div>           
            </div>
            
        )

}

export default AdminEditProduct;