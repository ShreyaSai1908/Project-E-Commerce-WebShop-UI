import React from 'react';
import axios from "axios";
import '../customCSS/AdminProductView.css';
import { Link } from 'react-router-dom';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

class  AdminCreateNewProduct extends React.Component
{ 
    initialState = {
        ProductName: '',
        Price: '',
        Description: ''
    }

    state = this.initialState


      handleChange = (event) => {
        const {name, value} = event.target
      
        this.setState({
          [name]: value,
        })
      }

      createProduct = (event) => 
      {
         event.preventDefault(); 
         const form=this.state;

         axios({
            method: 'post',
            url: 'https://localhost:44392/api/WebShopAPI/AddProduct',
            data: form
          })
          .then(response => 
          {       
              // handle success  
              if (response.status===200)
              {    
                this.setState(this.initialState) 
                console.log("New Product created");
              } 
                    
          })
          .catch(error => 
          {
            // handle error
            console.log("Product not created:", "Error while adding Product");
          })
          .then((response) => 
          {
            // always executed              
          });   
         
      }

    render()
    {
        const { ProductName, Price, Description} = this.state;

        return (
            <div>
                <div class="row">
                    <div class="col-md-4">
                        <form>
                            <div class="form-group">
                                <label htmlFor="ProductName" class="control-label">Name</label>
                                <input class="form-control" type="text" name="ProductName" id="form-ProductName" value={ProductName} onChange={this.handleChange}/>
                            </div>
                            <div class="form-group">
                                <label htmlFor="Description"  class="control-label">Description</label>
                                <textarea class="form-control" name="Description" id="form-Description" value={Description} onChange={this.handleChange}></textarea>
                            </div>
                            <div class="form-group">
                                <label htmlFor="Price"  class="control-label">Price</label>
                                <input class="form-control" name="Price" id="form-Price" value={Price} onChange={this.handleChange}/>
                            </div>
                            <div class="form-group">
                                <button  class="btn btn-primary" onClick={this.createProduct}>Create</button>
                            </div>
                        </form>
                    </div>
                </div>           
            </div>
            
        )

    }
}

export default AdminCreateNewProduct;