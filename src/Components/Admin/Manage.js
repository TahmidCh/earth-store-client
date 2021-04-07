import React, { useEffect, useState } from 'react';
import AdminDetails from '../AdminDetails/AdminDetails';



const Manage = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
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