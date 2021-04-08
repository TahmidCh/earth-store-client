import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import { useParams } from 'react-router';
import { loggedInInfo } from '../Login/LoginManager';

const PlaceOrder = () => {

  const { id } = useParams();

  const [redirect, setRedirect] = useState();

  const [products, setProducts] = useState({});

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const loggedUser = loggedInInfo();

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    fetch('https://serene-dawn-54027.herokuapp.com/products')
      .then(res => res.json())
      .then(data => {
        data.forEach(book => {
          if (book._id === id) {
            setProducts(book);
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
          const total = data.reduce((total, price) => total + parseFloat(price.products.price), 0)

          setTotalPrice(total)
        })
      });
  }, [id, redirect])

  const handleNext = () => {
    const newOrder = { ...loggedInUser, products };
    fetch('https://serene-dawn-54027.herokuapp.com/addOrder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data) {
          setRedirect(products);
        }
      })
  };


  return (
    <div className="container mt-2">

      <h3>Hello {loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}!</h3>

      <div className="d-flex justify-content-center">
        <Button variant="contained" color="primary" className=" w-50" onClick={handleNext}>Confirm Your Order</Button>
      </div>

      <div className="d-flex justify-content-between mt-5">
        <h6 className="">You have ordered total : {orders.length} products </h6> <h6>Your total price is BDT {totalPrice}</h6>
      </div>

      <table className="table table-striped">
        <thead className="table-light">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Manufacturer</th>
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
            </tr>)
            )
          }
        </tbody>

      </table>


    </div>
  );
};

export default PlaceOrder;