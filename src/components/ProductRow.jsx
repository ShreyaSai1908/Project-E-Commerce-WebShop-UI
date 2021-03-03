import React from 'react';
import Product from './Product';
import '../customCSS/Home.css';

class ProductRow extends React.Component
{
    render()
    {
        const {productRow, shoppingCart}=this.props
                
        let products = productRow                    
        .map((row, index) => {     
        return (       
                <Product key={index} 
                         productID={row.productID} 
                         productName={row.productName}
                         price={row.price}
                         desc={row.description}/>
            )
        })

        return(
            <div className="home__row">
                 {products}
            </div>     
        )
    }
}

export default ProductRow;