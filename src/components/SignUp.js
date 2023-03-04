import React,{useState, useEffect} from "react"
import {useNavigate} from "react-router-dom"

const SignUp=()=>{
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    const [mobile, setMobile]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
            const auth= localStorage.getItem('user');
            if(auth){
                navigate('/');
            }
        })
    const CollectionData=async ()=>{

        console.warn(name,email,password,mobile);
        let result= await fetch('http://localhost:5000/register',{
            method:"post",
            body: JSON.stringify({name,email,password,mobile}),
            headers:{
                'Content-Type': 'application/json'
            }, 
        });
        result = await result.json();
        console.warn(result);
        localStorage.setItem("user", JSON.stringify(result));
        navigate('/')
    }
    return(
        <div className="register">
            <h1 className="heading-register">Register</h1>
            <input className="inputbox" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter name" />
            
            <input className="inputbox" type="text" 
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email " />
            
            <input className="inputbox" type="password"
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Password" />
            
            <input className="inputbox" type="number"
            value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter Mobile number" />
            
            <button onClick={CollectionData} className="appButton " type="button">Sign-Up</button>
        </div>
    )
}

export default SignUp;