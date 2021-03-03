import React from 'react';
import { Link } from 'react-router-dom';
import '../customCSS/Login.css';

class Login extends React.Component
{
    initialState = {
        UserName: '',
        Password: ''
      }
    
      state = this.initialState


      handleChange = (event) => {
        const {name, value} = event.target
      
        this.setState({
          [name]: value,
        })
      }

      submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
      }

    render()
    {
        const { UserName, Password } = this.state;
        return(
            <div className="login">
                <Link to="/">
                  <img className="login__logo" src="./logo3.png" alt="logo"/>
                </Link>
                <div className="login__container">
                    <h1>Sign In</h1>                   
                    <form className="form-vertical">
                        <div className="form-group">
                            <label htmlFor="UserName">User Name</label>
                            <input type="text" name="UserName" className="form-control" id="form-UserName" value={UserName} onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Password">Password</label>
                            <input type="password" name="Password" className="form-control" id="form-Password" value={Password} onChange={this.handleChange}/>
                        </div>                   
                        <div className="form-group">
                            <input type="button" value="Submit" className="form-control login__signInButton" onClick={this.submitForm} />  
                        </div>                                                      
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;