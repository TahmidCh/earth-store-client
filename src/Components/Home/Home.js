import React, { useEffect, useState } from 'react';
import Details from '../Details/Details';
import './Home.css'


const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
    }, [])

    return (

        <div className="container">
            <div className="row d-flex justify-content-center">
                {
                    loading ? <div class="text-center">
                        <div class="spinner-border" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        </div> :
                        products.map(details => <Details details={details}></Details>)
                }
            </div>


        </div>
    );
};

export default Home;