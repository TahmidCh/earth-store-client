import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

const CheckOut = () => {
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        data.forEach(element => {
          if (element._id == id) {
            setProducts(element);
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
      <table class="table table-success table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
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
      <div className="d-flex justify-content-end"><button className="btn btn-success mt-3" onClick={() => handleBuy(products._id)}>Place order</button></div>

    </div>
  );
};

export default CheckOut;