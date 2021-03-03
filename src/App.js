import './App.css';
import React from 'react';
import axios from "axios";
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Checkout from './components/Checkout';
import PlaceOrder from './components/PlaceOrder';
import Payment from './components/Payment';
import Exit from './components/Exit';
class App extends React.Component
{
  state = 
  {
    loggedIn: false,
    userName: "Admin",
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
      console.log(login);
      await axios({
        method: 'post',
        url: 'https://localhost:44392/api/WebShopAPI/Login',
        data: login
      })
      .then(response => 
      {
        // handle success                  
          if (response.data.length>0)
          {    
             this.setState({userName: response.data}); 
             this.setState({loggedIn: true}); 
             window.location ="/LoginSuccess/?userName="+response.data  
             //this.props.history.push("/LoginSuccess");  
          }  
                
      })
      .catch(error => 
      {
        // handle error
        console.log("Error", error);
      })
      .then(() => 
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
