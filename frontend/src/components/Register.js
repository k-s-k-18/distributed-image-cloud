import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";

const Register = ()=>{

    const[passwordCheck, setPasswordCheck] = useState(false);

    const[redirect, setRedirect] = useState(false);

    const [registerInfo, setRegisterInfo] = useState({
        'first_name':'',
        'last_name':'',
        'email':'',
        'password':'',
        'confirm_password':''
    });




    const registerUser = (e)=>{
        e.preventDefault();
        //console.log(registerInfo);

        if(registerInfo.password === registerInfo.confirm_password){
            const request = new Request('http://localhost:8081/auth/register',{
                method:'POST',
                headers: new Headers({
                    'Content-Type':'application/json'
                }),
                body:JSON.stringify(registerInfo)
            });

            fetch(request)
            .then(response=>{
                if(response.ok){
                    document.cookie = `photo-cloud-token=${response.headers.get('Authorization')}`;
                    return response.json();
                }
                else{
                    //Handling Invalid token or response
                }
            })
            .then((data)=>{
                setRedirect(true);
            });
        }else{
            setPasswordCheck(true);
        }

    }

    return(
        <>
            <div className="register">
                <h2> Get Started!</h2>

                {passwordCheck && <p>Please make sure passwords match!</p>}
                <form className="register-form">

                    <div className="input-field">
                        <label htmlFor="first_name">First Name</label>
                        <input type="text" name="first_name" placeholder="First Name"
                            onChange={(e)=>setRegisterInfo({...registerInfo,[e.target.name]:e.target.value})}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="last_name">Last Name</label>
                        <input type="text" name="last_name" placeholder="Last Name"
                            onChange={(e)=>setRegisterInfo({...registerInfo,[e.target.name]:e.target.value})}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Email"
                            onChange={(e)=>setRegisterInfo({...registerInfo,[e.target.name]:e.target.value})}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder="Password"
                            onChange={(e)=>setRegisterInfo({...registerInfo,[e.target.name]:e.target.value})}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" name="confirm_password" placeholder="Confirm Password"
                            onChange={(e)=>{setRegisterInfo({...registerInfo, [e.target.name]:e.target.value})}}/>
                    </div>

                    <button className="register-btn" onClick={e=>registerUser(e)}> Register </button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>

                {redirect && <Redirect to="/dashboard"></Redirect>}
            </div>
        </>
    );
}

export default Register;