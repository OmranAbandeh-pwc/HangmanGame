import React, { useState } from 'react'
import "../../style/pages/Auth/authpages.css"

const SignupPage = () => {

    const [signupinfo, setSignupinfo] = useState({
        name:"",
        email:"",
        password:"",
        confPassword:""
    })


    const signupHandle = async () => {
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const dataSumbit = {
            "name": signupinfo.name,
            "email": signupinfo.email,
            "password": signupinfo.password,
            "conf_password": signupinfo.confPassword
          }

        const response = await fetch("/hangman/signup", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(dataSumbit)
          })
        const data = await response.json()
        if(data.msg === "email-exist"){
            alert("email-exist")
        }else if(data.msg === "shortPassword"){
          alert("shortPassword")
        } else if(data.msg === "notMatched") {
          alert("notMatched")
        } else {
          
          
            const response = await fetch("/hangman/login", {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify(dataSumbit)
              })
              const data = await response.json()

              if(data.msg === "success"){
                localStorage.setItem("userToken",data.token)
                window.location.replace("/")
              } else {
                alert("somthing gone wrong")
              }
        }
          
    }

  return (
    <div className='main-auth-container'>

    <div className="login-info-container">
        <p>Welcome to the Hangman Game Please Signin to Start the game,</p>
        <p>if you already have an account you can <a href='/'>Login</a> right now</p>
    </div>

    <div className="input-container">
        <input type="text" placeholder="Username" onChange={(e) => setSignupinfo({...signupinfo, name:e.target.value})}/>
    </div>

    <div className="input-container">
        <input type="email" placeholder="E-mail" onChange={(e) => setSignupinfo({...signupinfo, email:e.target.value})}/>
    </div>
    <div className="input-container">
        <input type="password" placeholder="Password" onChange={(e) => setSignupinfo({...signupinfo, password:e.target.value})}/>
    </div>

    <div className="input-container">
        <input type="password" placeholder="conf-Password" onChange={(e) => setSignupinfo({...signupinfo, confPassword:e.target.value})}/>
    </div>

    <div className="login-button-container">
        <button onClick={signupHandle}>Signup</button>
        
    </div>
  
</div>
  )
}

export default SignupPage
