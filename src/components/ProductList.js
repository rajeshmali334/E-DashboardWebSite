import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList=()=>{
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts= async ()=>{
        let result = await fetch("http://localhost:5000/product");
        result  = await result.json();
        setProducts(result);
        
    }

    const deleteproduct= async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method:"Delete"
        });
        result = await result.json();
        if(result){
            getProducts();
        }
    };

    const searchHandle=async(event)=>{
       
        let key = event.target.value;
        
        if(key){
            let result= await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProducts();
        }
    }

    return (
        <div className="product-list">
            <h1>product list</h1>
            <input className="search-product-box" type="text" placeholder="Search Product"
                onChange={searchHandle}
             />
            <ul>
                <li>S.No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>
            </ul>
            {
               products.length > 0 ? products.map((item, index)=>
            <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <button onClick={()=>deleteproduct(item._id)}>Delete</button>
                    <button><Link className="updatelink" to={"/update/"+item._id}>update</Link></button>
                    
                </li>
            </ul>
                )
                : <h1>Result No fount</h1>
            }
        </div>
    )
}
export default ProductList;