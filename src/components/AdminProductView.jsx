import axios from "axios";
import '../customCSS/AdminProductView.css';
import { Link } from 'react-router-dom';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function AdminProductView ({productList})
{
    const history = useHistory();
    const [{basket,loggedInUser,customerID,custOrderList, allProductList}, dispatch] = useStateValue();

    useEffect(() =>     
    {   
           axios.get("https://localhost:44392/api/WebShopAPI/GetProducts", 
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
                    type: 'SET_ALL_PRODUCTS',
                    allProductList: response.data,
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


    function editProduct(row)    
    {         
        console.log("Product=", row)
        dispatch({
            type: 'EDIT_PRODUCT',
            editProduct: row
        }) 
        history.push("/EditProduct");
    }

    function deleteProduct(row)   
    {
        axios({
            method: 'post',
            url: 'https://localhost:44392/api/WebShopAPI/DeleteProduct',
            data: row
          })
          .then(response => 
          {       
              // handle success  
              if (response.status===200)
              {    
                    console.log("Product Deleted");
              } 
                    
          })
          .catch(error => 
          {
            // handle error
            console.log("Product cannot be deleted:", error);
          })
          .then((response) => 
          {
            // always executed              
          });  
    }

    var tabRow = allProductList
    .map((row, index) => {     
    return (    
    <tr key={index}> 
        <td>{row.productID}</td>
        <td>{row.productName}</td>
        <td>{row.description}</td>
        <td><small>$</small>{row.price}</td>  
        <td>
            <a  href="#" onClick={() => {
                                         editProduct(row)
                                        }
                                  }>
               <span>Edit</span> 
            </a> <span> | </span> 
            <a href="#" onClick={() => {
                                         deleteProduct(row)
                                        }
                                }>
                <span>Delete</span> 
            </a>
        </td>  
    </tr>
    )
    })

    return( 
        <div className="productViewContent">
                <div className="row">
                    <div className="col-sm-12">
                        <Link to="/CreateProduct">
                            <div>              
                                <span>Create New Product</span>
                            </div>                        
                        </Link>
                    </div>
                </div>
                <br/>
                <div className="row">
                    <div className="col-sm-12">
                        <table class="table table-hover">
                                    <thead class="thead-dark">  
                                        <tr>
                                            <th scope="col">Product#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col"> </th>
                                        </tr>
                                </thead>   
                                <tbody>{tabRow}</tbody>           
                        </table>  
                    </div>                 
                </div>  
        </div>
         
    )
}
export default AdminProductView;