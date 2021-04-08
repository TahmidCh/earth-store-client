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
    fetch('https://serene-dawn-54027.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        data.forEach(element => {
          if (element._id === id) {
            setProducts(element);
          }
        })
      })

    fetch('https://serene-dawn-54027.herokuapp.com/orders?email=' + loggedUser.email, {
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

      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Author</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            
          </tr>
        </thead>
        <tbody>
          {
            orders.map(element =>
            (<tr key={element._id}>
              <td>{element.products.name}</td>
              <td>{element.products.author}</td>
              <td>1</td>
              <td>${element.products.price}</td>
              
            </tr>)
            )
          }
        </tbody>

      </table>


    </div>
    );
};

export default Orders;
