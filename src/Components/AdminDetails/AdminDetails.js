import React, { useState } from 'react';
import logo1 from '../../icons/Group 33150.png';
import logo2 from '../../icons/Group 307.png';
import './AdminDetails.css';

const AdminDetails = ({ products }) => {
  const [product, setProduct] = useState([]);

  console.log('clicked');
  const deleteProduct = id => {
    fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => setProduct(data))
  }

  return (
    <div className="mt-2 card">
       <p className="text-center text-success mt-3"> <strong>Manage products</strong> <hr/></p>
      <div className=" d-flex justify-content-evenly">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              products.map(details => (
                <tr>
              <td>{details.name}</td>
              <td>{details.author}</td>
              <td>${details.price}</td>
              <td>
                <div>
                  <img className="logo" src={logo2} alt="" />
                  <img className="logo" onClick={() => deleteProduct(details._id)} src={logo1} alt="" />
                </div>
              </td>
            </tr>
              ))
            }
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default AdminDetails;