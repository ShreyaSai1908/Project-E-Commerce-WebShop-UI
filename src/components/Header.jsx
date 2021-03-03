import React from 'react';
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import '../customCSS/Header.css';
import { Link } from 'react-router-dom';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';

function Header ({loggedIn})
{         
        const history = useHistory();

        const search = history.location.search; 
        const params = new URLSearchParams(search);
        const userName = params.get('userName'); 
        const customerID = params.get('customerID'); 

        

        const [{basket,loggedInUser},dispatch]=useStateValue();  
        const productInBasket=basket?.length;   

        let txtLogLink;
        let imgSrc;

        if (loggedIn)
        {
            imgSrc="../logo3.PNG";
            txtLogLink="Sign Out";            
        }  
        else
        {
            imgSrc="./logo3.PNG";
            txtLogLink="Sign In";
        }

        useEffect(() => {  
            dispatch({
                type: 'SET_PRODUCT_FILTER',
                productToFilter: ""
            })    

            if (loggedIn)
            {
                dispatch({
                    type: 'SET_LOGIN',
                    userName: userName,
                    customerID: customerID
                })
            }
          },[]);
      
          function searchProduct ()  {
              var productToSearch=document.getElementById('txtProductSearch').value;
              console.log("Product to Search",productToSearch)
              dispatch({
                type: 'SET_PRODUCT_FILTER',
                productToFilter: productToSearch
            })   
            document.getElementById('txtProductSearch').value="";
          }  
          
          console.log("loggedInUser=",loggedInUser);      
        return(               

            <nav className="header">
               <img className="header__logo" src={imgSrc} alt="logo"/>
               <div className="header__search">
                   <input type="text" id="txtProductSearch" className="header__searchInput" placeholder="search products..."/>
                   <button type="button" onClick={searchProduct} className="header__searchButton">
                           <i className="fa fa-search"></i>
                   </button>
               </div>
               <div className="header__nav">
                    <Link to="/Login" className="header__link">
                        <div className="header__option">      
                           <span className="header__optionUserLine1">Hello,{loggedInUser}</span> 
                           <span className="header__optionUserLine2">{txtLogLink}</span>
                        </div>
                    </Link> 
                    {                       
                       loggedInUser==='Admin' ? (
                            <Link to="/AdminHome" className="header__link">
                                <div className="header__option">              
                                    <span className="header__optionOrders">Admin-Home</span>
                                </div>
                            </Link> 
                       ):(
                            <Link to="/Orders" className="header__link">
                                <div className="header__option">              
                                    <span className="header__optionOrders">Orders</span>
                                </div>
                            </Link> 
                       ) 
                    }                    
                    <Link to="/Checkout" className="header__link">
                        <div className="header__optionBasket">
                            <ShoppingBasketIcon/>
                            <span className="header__productCount">{productInBasket}</span>
                        </div>
                    </Link>
                </div>
            </nav>
        )
    
}

export default Header;