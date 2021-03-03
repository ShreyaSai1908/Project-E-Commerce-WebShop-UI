export const initialState = { 
    allProductList:[],   
    basket:[],
    loggedInUser: "",
    customerID: "",
    productToFilter: "",
    orderHeader:[],
    delivery:[],
    custOrderList:[],
    adminOrderList:[],
    custOrderDetail:[],
    editProduct:[],
}

const reducer = (state, action) =>{   
    switch(action.type){
        
        case 'SET_ALL_PRODUCTS':
            return {
                 ...state,
                 allProductList: action.allProductList
        }

        case 'ADD_TO_BASKET':
            return {
                 ...state,
                 basket: [...state.basket, action.item]
            }

        case 'SET_LOGIN':
            return {
                ...state,
                loggedInUser: action.userName,
                customerID: action.customerID
            }

        case 'EDIT_PRODUCT':
            return {
                ...state,
                editProduct: action.editProduct
            }    

        case 'SET_ADMIN_ORDER_LIST':
                return {
                    ...state,
                    adminOrderList: action.adminOrderList 
                }       
        
        case 'SET_CUSTORDER_LIST':
                return {
                    ...state,
                    custOrderList: action.custOrderList 
                }    

        case 'SET_SUBORDER_DETAIL':
            return {
                ...state,
                custOrderDetail: action.custOrderDetail 
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