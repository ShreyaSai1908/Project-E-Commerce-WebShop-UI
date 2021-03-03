import React from 'react';
import ProductRow from '../components/ProductRow';
import '../customCSS/Home.css';
import {useStateValue} from '../components/StateProvider';

function Home ({productList})
{        
        const [{basket,loggedInUser,productToFilter},dispatch]=useStateValue();   
        
        var searchedProductList;  //holds the products that matches the searched name in the Home page
        var productListToDisplay; //holds the products that needs to be displayed in the Home page

        if (productToFilter !=null)
        {
            searchedProductList= productList.filter(allProducts => 
            allProducts.productName.toLowerCase().includes(productToFilter.toLowerCase())).map(searchedProducts => {
                return(
                   searchedProducts
                );
            })
            productListToDisplay=searchedProductList; //Product filter applied, show only searched product 
        }
        else
        {
            productListToDisplay=productList;         //Product filter not applied, show all products 
        }
        
        var productRow;            //variable for rendering rows of products 
        var i=0;                   //control variable for loop
        var j=0;                   //control variable for loop
        var chunk = 3;             //controls number of products in a row
        var productRowSet=[];      //holds each row of products
        var rowIndex=0;            //holds index of each product rows

        for (i=0,j=productListToDisplay.length; i<j; i+=chunk) 
        {            
            productRowSet[rowIndex] = productListToDisplay.slice(i,i+chunk);
            rowIndex=rowIndex+1;            
        }

         productRow=productRowSet
        .map((row, index) => 
         { 
           return (                       
                    <ProductRow key={index} productRow={row}/>
                  )
          })

        
        return(
            <div className="home">  
                    <img className="home__banner" src="../homepage_banner.jpg" alt="Home Banner"/>               
                    {productRow}
            </div>
        )
    
}

export default Home;