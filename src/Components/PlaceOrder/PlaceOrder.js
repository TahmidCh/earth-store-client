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

  const [selectedDate, setSelectedDate] = useState({
    from: new Date()
  });

  const handleFromDate = (date) => {
    const newDates = { ...selectedDate };
    newDates.from = date;
    setSelectedDate(newDates);
  };

  const handleNext = () => {
    const newOrder = { ...loggedInUser, ...selectedDate, products };
    fetch('http://localhost:5000/addOrder', {
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

      <h3>Welcome back, {loggedInUser.name || loggedUser.name ? loggedInUser.name || loggedUser.name : loggedInUser.displayName || loggedUser.displayName}!</h3>
      <h6>Pick time range for delivery and click to confirm...</h6>
      <div className="card m-3 p-3">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="From"
              value={selectedDate.from}
              onChange={handleFromDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>


        </MuiPickersUtilsProvider>
      </div>
      <div className="d-flex justify-content-center">
        <Button variant="contained" color="primary" className=" w-50" onClick={handleNext}>Confirm Your Order</Button>
      </div>

      <div className="d-flex justify-content-between mt-5">
      <h6 className="">You have ordered total : {orders.length} book/s </h6> <h6>Your total price is BDT {totalPrice}</h6>
      </div>

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

export default PlaceOrder;