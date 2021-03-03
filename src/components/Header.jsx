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
        const userName = history.location.search. substring(history.location.search. indexOf('=') + 1);
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
                productToFilter: null
            })    

            if (loggedIn)
            {
                dispatch({
                    type: 'SET_LOGIN',
                    user: userName
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
                    <Link to="/" className="header__link">
                        <div className="header__option">              
                            <span className="header__optionOrders">Orders</span>
                        </div>
                    </Link> 
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