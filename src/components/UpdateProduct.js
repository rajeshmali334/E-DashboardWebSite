import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        getProductDetails();
    }, []);

    const getProductDetails = async () => {
        console.warn(params);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    const updateproduct = async () => {
        console.warn(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json'
            }

        });

        result = await result.json();
        console.log(result);
        navigate("/");
    }


    return (
        <div className="product">
            <h1 className="heading-addproduct">Update Product</h1>

            <input type="text" placeholder="Enter Product name" className=" inputbox"
                value={name} onChange={(e) => setName(e.target.value)} />


            <input type="text" placeholder="Enter Product Price" className=" inputbox"
                value={price} onChange={(e) => setPrice(e.target.value)} />


            <input type="text" placeholder="Enter Product Category" className=" inputbox"
                value={category} onChange={(e) => setCategory(e.target.value)} />


            <input type="text" placeholder="Enter Product Company" className=" inputbox"
                value={company} onChange={(e) => setCompany(e.target.value)} />


            <button onClick={updateproduct} className="appButton">Update Product</button>
        </div>
    )
}

export default UpdateProduct