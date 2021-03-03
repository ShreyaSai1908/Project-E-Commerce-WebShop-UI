import React from 'react';
import ProductRow from './ProductRow';
import '../customCSS/Home.css';
import {useStateValue} from './StateProvider';
import { Link } from 'react-router-dom';

function Exit ()
{ 
    return(
        <div className="home">  
               <img className="exit__banner" src="../homepage_banner.jpg" alt="Home Banner"/>  
               <div className="exit__msg">
                   Thank You for shopping with Us!
                </div>   
                <a href="/" className="exit__toHomeLink">
                    <p>Start Shopping Again</p>
                </a>    
        </div>
    )
}

export default Exit;