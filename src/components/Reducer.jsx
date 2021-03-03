export const initialState = {
    basket:[],
    loggedInUser: null,
    productToFilter: null,
    orderHeader:[],
    delivery:[]
}

const reducer = (state, action) =>{   
    switch(action.type){
        
        case 'ADD_TO_BASKET':
            return {
                 ...state,
                 basket: [...state.basket, action.item]
            }

        case 'SET_LOGIN':
            return {
                ...state,
                loggedInUser: action.user
            }
        
        case 'ORDER_PLACED':
            return {
                ...state,
                orderHeader: action.orderHeader 
            }    

        case 'SET_DELIVERY':
            return {
                ...state,
                delivery: action.delivery 
            }   
             
        case 'SET_PRODUCT_FILTER':
                return {
                    ...state,
                    productToFilter: action.productToFilter
                }    
               
        case 'REMOVE_FROM_CART':
            let newCart=[...state.basket]
            const index = state.basket.findIndex((basketItem)=> basketItem.ProductID===action.ProductID)
            if (index >=0){
                newCart.splice(index,1);
            }
            return {...state.basket, basket:newCart}
    }
} 

export default reducer;