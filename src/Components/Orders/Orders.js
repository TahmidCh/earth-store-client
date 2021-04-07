import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loggedInInfo } from '../Login/LoginManager';

const Orders = () => {
    
  const { id } = useParams();

  const [redirect, setRedirect] = useState();

  const [products, setProducts] = useState({});

  const [orders, setOrders] = useState([]);

  const loggedUser = loggedInInfo();

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then(res => res.json())
      .then(data => {
        data.forEach(book => {
          if (book._id === id) {
            setProducts(book);
          }
        })
      })

    fetch('http://localhost:5000/orders?email=' + loggedUser.email, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data)
        data.forEach(products => {
          const total = data.reduce( (total, price) => total + parseFloat(price.products.price), 0)
          setTotalPrice(total)
        })
      });
  }, [id, redirect])

    return (
        <div className="container mt-2">

      <div className="d-flex justify-content-between mt-5">
      <h6 className="">You have ordered total : {orders.length} book/s </h6> <h6>Your total price is BDT {totalPrice}</h6>
      
      </div>
      <p>Please wait for a moment or reload the page</p>

      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Delivery</th>
          </tr>
        </thead>
        <tbody>
          {
            orders.map(book =>
            (<tr key={book._id}>
              <td>{book.products.name}</td>
              <td>{book.products.author}</td>
              <td>1</td>
              <td>${book.products.price}</td>
              <td>{(new Date(book.from)).toDateString('dd/MM/yyyy')}</td>
            </tr>)
            )
          }
        </tbody>

      </table>


    </div>
    );
};

export default Orders;
