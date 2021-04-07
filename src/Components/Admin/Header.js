import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo5 from '../../icons/grid 1.png';
import logo6 from '../../icons/edit 1.png';
import logo7 from '../../icons/plus 1.png';
import '../AdminDetails/AdminDetails.css';


const Header = () => {
    return (
        <div class="dropdown d-flex justify-content-center mt-3">
            <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Actions
  </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><Link className="btn btn-success dropdown-item" to="/admin/add">ADD</Link></li>
                <li><Link className="btn btn-success dropdown-item" to="/admin/manage">MANAGE</Link></li>
                <li><Link className="btn btn-success dropdown-item" to="/admin/edit">EDIT</Link></li>
            </ul>
        </div>
    );
};

export default Header;