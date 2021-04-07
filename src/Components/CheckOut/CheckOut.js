import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const CheckOut = () => {
    const {id} = useParams();
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/')
        .then(res => res.json())
        .then(data => {
            data.forEach(book =>{ 
            if(book._id == id) {
                setProducts(book); 
            }
            })
        })
    }, [id])

    const history = useHistory();
    const handleBuy = (_id) => {
        history.push(`/checkout/${_id}/placeOrder`);
    }

    console.log(products);
    return (
        <div className="mt-5 container">
            <h1>Checkout</h1>
            <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{products.name}</td>
      <td>{products.author}</td>
      <td>1</td>
      <td>${products.price}</td>
    </tr>
  </tbody>
</table>
            <p>Want to check a different book? <a href="/home">Click Me</a></p>
            <div className="d-flex justify-content-end"><button className="btn btn-success mt-3" onClick={() => handleBuy(products._id)}>Place order</button></div>
            
        </div>
    );
};

export default CheckOut;