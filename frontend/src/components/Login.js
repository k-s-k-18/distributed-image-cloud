import { useState } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const Login = ()=>{

    const [redirect, setRedirect] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        'email':'',
        'password':''
    })

    const userLogin = (e)=>{
        e.preventDefault();

        console.log(loginInfo);

        const request = new Request('http://localhost:8081/auth/login',{
            method:'POST',
            headers:new Headers({
                'Content-Type':'application/json'
            }),
            body:JSON.stringify(loginInfo)
        });

        fetch(request)
        .then((response)=>{
                if(response.ok){
                    //console.log(response.headers.get('Authorization'));
                    document.cookie = `photo-cloud-token=${response.headers.get('Authorization')}`;
                    return response.json();
                }
                else{
                    //Handling Invalid token or response
                }
        })
        .then((data)=>{
            //console.log(document.cookie);
            setRedirect(true);
        }
        );
        
    }


    return(
        <>
            <div className="login">
                <h2>Welcome Back</h2>
                <form className="login-form">
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <br></br>
                        <input type="email" name="email" placeholder="Email" onChange={(e)=>{setLoginInfo({...loginInfo,[e.target.name]:e.target.value})}}/>
                    </div>
                    <br></br>
                    <div className="input-field">
                    <label htmlFor="password">Password</label>
                        <br></br>
                        <input type="password" name="password" placeholder="Password" onChange={(e)=>{setLoginInfo({...loginInfo,[e.target.name]:e.target.value})}}/>
                    </div>
                    <br></br>
                    <button className="login-btn" onClick={(e)=>{userLogin(e)}}>Login</button>
                    <p>Or</p>
                    <Link className="signup-btn" to="/register">Register</Link>
                </form>
                
                {redirect && <Redirect to="/dashboard"></Redirect>}
            </div>
        </>
    );
}

export default Login;