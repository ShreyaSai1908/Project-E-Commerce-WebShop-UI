import './App.css';
import React from 'react';
import axios from "axios";
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {useStateValue} from './components/StateProvider';
import { useHistory } from "react-router-dom";
import Checkout from './components/Checkout';
import PlaceOrder from './components/PlaceOrder';
import Payment from './components/Payment';
import Exit from './components/Exit';
import OrderView from './components/OrderView';
import AdminHome from './components/AdminHome';
import AdminHeader from './components/AdminHeader';
import AdminProductView from './components/AdminProductView';
import AdminOrderView from './components/AdminOrderView';
import AdminCreateNewProduct from './components/AdminCreateNewProduct';
import AdminEditProduct from './components/AdminEditProduct';
import AdminEditOrder from './components/AdminEditOrder';
import AdminEditOrderDetail from './components/AdminEditOrderDetail';

class App extends React.Component
{
  state = 
  {
    loggedIn: false,
    userName: "Admin",
    customerID: "",
    productList: [],
  }
 
  componentDidMount()
  {      
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

      axios //The url might be a bit different for your (the port number is 44302 for me but you might have 44004)
      .get("https://localhost:44392/api/WebShopAPI/GetProducts")
      .then(response => {
        // handle success        
        this.setState({productList: response.data});        
      })
      .catch(error => {
        // handle error
        console.log("Error", error);
      })
      .then(() => {
        // always executed        
      });
  }  

    
  handleSubmit = async (login) =>   
  {   
      await axios({
        method: 'post',
        url: 'https://localhost:44392/api/WebShopAPI/Login',
        data: login
      })
      .then(response => 
      {       
          // handle success  
          if (response.status===200)
          {    
             if (response.data.userName==="Admin")
             {
              this.setState({userName: response.data.userName});               
              window.location ="/AdminHome/?userName="+response.data.userName+"&customerID="+response.data.customerID       
             }           
             else
             {
              this.setState({userName: response.data.userName});               
              window.location ="/LoginSuccess/?userName="+response.data.userName+"&customerID="+response.data.customerID        
             }
                      
          } 
                
      })
      .catch(error => 
      {
        // handle error
        console.log("Error while Login", "UserName/Password did not match");
      })
      .then((response) => 
      {
        // always executed
 
      });    
  }; 

  render()
  {
      return (
        <Router>
            <div className="App">
              <Switch>                              
              <Route path="/LoginSuccess">
                    <Header loggedIn="true" userName={this.state.userName}/>
                    <Home productList={this.state.productList}/>
                </Route>   
                <Route path="/Login">
                    <Login handleSubmit={this.handleSubmit} />
                </Route>               
                <Route path="/Orders">
                    {/*<Header userName={this.state.userName} />*/}
                    <OrderView/>
                </Route>
                <Route path="/Checkout">
                    {/*<Header userName={this.state.userName} />*/}
                    <Checkout/>
                </Route>
                <Route path="/PlaceOrder">
                      {/*<div>
                        <Header userName={this.state.userName} />
                      </div> <br/>*/}
                      <div>
                        <PlaceOrder/>
                      </div>
                </Route>
                <Route path="/Payment">
                    {/*<Header userName={this.state.userName} />*/}
                    <Payment/>
                </Route>
                <Route path="/PaymentSuccess">
                    {/*<Header userName={this.state.userName} />*/}
                    <Exit/>
                </Route>   
                <Route path="/AdminHome">
                    <AdminHeader/>
                    <AdminHome productList={this.state.productList}/>
                </Route>   
                <Route path="/AdminProducts">
                    <AdminHeader/>
                    <br/>
                    <AdminProductView productList={this.state.productList}/>
                </Route>   
                <Route path="/AdminOrders">
                    <AdminHeader/>
                    <br/>
                    <AdminOrderView/>
                </Route>   
                <Route path="/CreateProduct">
                    <AdminHeader/>
                    <br/>
                    <AdminCreateNewProduct/>
                </Route>  
                <Route path="/EditProduct">
                    <AdminHeader/>
                    <br/>
                    <AdminEditProduct/>
                </Route> 
                <Route path="/EditOrder">
                    <AdminHeader/>
                    <br/>
                    <AdminEditOrder/>
                </Route>        
                <Route path="/EditOrderDetail">
                    <AdminHeader/>
                    <br/>
                    <AdminEditOrderDetail/>
                </Route> 
                <Route path="/">
                    <Header loggedIn={this.state.loggedIn} userName={this.state.userName}/>
                    <Home productList={this.state.productList} />
                </Route> 
                
              </Switch>
            </div>
        </Router>
        
        );
  }  
  
}

export default App;
