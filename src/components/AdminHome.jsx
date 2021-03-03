import React from 'react';
import {useStateValue} from '../components/StateProvider';
import { useHistory } from "react-router-dom";
import { useEffect } from 'react';
import '../customCSS/Home.css';

function AdminHome ({productList})
{ 
    const history = useHistory();
    const search = history.location.search; 
    const params = new URLSearchParams(search);
    const userName = params.get('userName'); 
    const customerID = params.get('customerID');
    const [{basket,loggedInUser},dispatch]=useStateValue();  

    useEffect(() => {  
            dispatch({
                type: 'SET_LOGIN',
                userName: userName,
                customerID: customerID
            })
        
      },[]);

    return( 

        <div>This is Admin Home Page</div>
    )
}
export default AdminHome;