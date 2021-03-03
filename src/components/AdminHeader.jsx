import React from 'react';
import '../customCSS/AdminHeader.css';
import { Link } from 'react-router-dom';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import Home from './Home';

function AdminHeader ({loggedIn})
{
    
    var imgSrc="../logo3.PNG";
    return(
        <nav className="adminHeader">   
            <img className="header__logo" src={imgSrc} alt="logo"/>          
            <Link to="/AdminProducts" className="adminHeader__link">
                        <div className="adminHeader__option">              
                            <span className="adminHeader__optionOrders">Products</span>
                        </div>                        
            </Link> 
            <Link to="/AdminOrders" className="adminHeader__link">
                        <div className="adminHeader__option">              
                            <span className="adminHeader__optionOrders">Orders</span>
                        </div>
                        
            </Link>
            <Link to="/" className="adminHeader__link">
                        <div className="adminHeader__option">              
                            <span className="adminHeader__optionOrders">Webshop-Home</span>
                        </div>
                        
            </Link>
        </nav>
    )
}
export default AdminHeader;