import React from 'react';
import { useHistory } from 'react-router';
import './Details.css';

const Details = ({ details }) => {
    const history = useHistory();
    const handleBuy = (name) => {
        history.push(`/checkout/${details._id}`);
    }
    return (
        <div className="mt-3 col-md-3 mx-2 pb-3">
            <div className="cardClass">
                <div className="p-4">
                    <div className="card cartVehicle">
                        <div className="d-flex justify-content-center">
                            <img src={details.imgUrl} className="" alt="" />
                        </div>
                        <div className="card-body text-dark text-center">
                            <p className="card-text text-center author"><strong>{details.name}</strong></p>
                            <p className="text-center ">{details.author}</p>
                            <div className="d-flex justify-content-around price">
                                <h4>${details.price}</h4>
                                <button className="btn btn-warning buyButton" onClick={() => handleBuy(details.name)}>Buy Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;