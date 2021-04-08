import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { Button, Col, Container, Form, InputGroup, Nav, Navbar } from 'react-bootstrap';




const Admin = () => {
    
    const { register, handleSubmit, errors } = useForm();
    const [imgUrl, setImageUrl] = useState(null);
    const history = useHistory();
    const handleEventForm = data => {
        console.log(data)
        const bookData = {
            name: data.name,
            author: data.author,
            price: data.price,
            imgUrl: imgUrl

        }
        const url = `http://localhost:5000/addproducts`;


        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    alert("Product added at Home page")
                    window.location.href = "/admin/add";
                }
            })

    }

    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'ef2890659b56f6e074699c708b63ac7d');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',
            imageData)
            .then(function (response) {
                setImageUrl(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        
        <div className="container">
            <div >
                <p className="text-center text mt-3"> <strong>Upload Products</strong> </p>
                <div className="container">
                    <form onSubmit={handleSubmit(handleEventForm)}>
                        <div className="d-flex justify-content-evenly p-5">
                            <div>
                                <h4>Product name</h4>
                                <input name="name" defaultValue="name" ref={register} />
                                <h4 className="mt-3">Company</h4>
                                <input name="author" defaultValue="company" ref={register} />
                            </div>
                            <div>
                                <h4>Price</h4>
                                <input name="price" defaultValue="price" ref={register} />
                                <h4 className="mt-3">Add Product Picture</h4>
                                <div className="input-group mb-3">
                                    <input id="file" accept="image/*" onChange={handleImageUpload} className="w-100 mx-auto btn btn-dark form-control" type="file" name="img" ref={register({ required: true })} />
                                    {errors.eventBanner && <span className="error">Icon is required</span>}
                                    <label className="btn btn-primary active w-100" for="file">
                                        Upload Image</label>
                                </div>
                                {imgUrl && <p className="text-success">Image has been uploaded</p>}
                            </div>
                        </div>

                        <button className="btn btn-primary active float-end mb-2" type="submit"> <img style={{ width: "30px" }}  alt="" /> Add Product</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Admin;