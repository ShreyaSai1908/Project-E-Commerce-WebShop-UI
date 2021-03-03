import React from 'react';
import { Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import '../customCSS/DeliveryDetails.css';

class  DeliveryDetails extends React.Component
{ 
    initialState = {
        Name: '',
        Address: '',
        City: '',
        ZipCode: '',
        PhoneNumber: ''
      }
    
      state = this.initialState


      handleChange = (event) => {
        const {name, value} = event.target
      
        this.setState({
          [name]: value,
        })
      }

      placeOrder = (event) => {
         event.preventDefault(); 
         this.props.handleSubmit(this.state)
         this.setState(this.initialState)
      }
    
    render()
    {
        const { Name, Address, City, ZipCode, PhoneNumber } = this.state;
        return(
            <div class="row">
            <div class="col">
                <form>
                    <div class="text-danger"></div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" htmlFor="Name">Name</label>                    
                        <div class="col-sm-10">
                            <input class="form-control" type="text" name="Name" id="form-Name" value={Name} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"  htmlFor="Address">Address</label>
                        <div class="col-sm-10">
                            <textarea class="form-control" name="Address" id="form-Address" value={Address} onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"  htmlFor="City">City</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" name="City" id="form-City" value={City} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" htmlFor="ZipCode">Zip Code</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" name="ZipCode" id="form-ZipCode" value={ZipCode} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" htmlFor="PhoneNumber">Phone Number</label>
                        <div class="col-sm-10">
                            <input class="form-control" type="text" name="PhoneNumber" id="form-PhoneNumber" value={PhoneNumber} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-10">
                            <button className="deliveryDetail__PlaceOrderButton col-sm-12" onClick={this.placeOrder}>Place Order</button>
                        </div>                
                    </div>
                </form>
            </div>
        </div>
        )

    }
    
}
export default DeliveryDetails;