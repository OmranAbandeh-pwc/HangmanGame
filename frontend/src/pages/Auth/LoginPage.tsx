import { useState } from "react";
import "../../style/pages/Auth/authpages.css"
import { LoginObject } from '../../types';
import { Navigate } from "react-router-dom";


const LoginPage = () => {

    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password:"",
    })

    const loginHandle = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const dataSumbit = {
            "email": loginInfo.email,
            "password": loginInfo.password
          }

        const response = await fetch("/hangman/login", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(dataSumbit)
          })

        const data:LoginObject = await response.json()

        if(data.msg === "success"){
            localStorage.setItem("userToken", data.token)
            window.location.replace("/")
           
        } else {
            alert("email or password not vaild")
        }

        console.log(data)
    }


  return (
    <div className='main-auth-container'>

        <div className="login-info-container">
            <p>Welcome to the Hangman Game Please Signin to Start the game,</p>
            <p>if you don't have an email you can <a href="/signuppage">Signup</a> right now</p>
        </div>

        <div className="input-container">
            <input type="email" placeholder="E-mail" onChange={(e) => setLoginInfo({...loginInfo, email:e.target.value})}/>
        </div>
        <div className="input-container">
            <input type="password" placeholder="Password" onChange={(e) => setLoginInfo({...loginInfo, password:e.target.value})}/>
        </div>

        <div className="login-button-container">
            <button onClick={loginHandle} >Login</button>
            
        </div>
      
    </div>
  )
}

export default LoginPage
