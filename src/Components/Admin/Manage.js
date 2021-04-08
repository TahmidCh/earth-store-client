import React, { useEffect, useState } from 'react';
import AdminDetails from '../AdminDetails/AdminDetails';



const Manage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://serene-dawn-54027.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [products])

    return (
        <div className="container">
            <div className="row">
            <AdminDetails products={products}/>
        </div>
        </div>
    );
};

export default Manage;