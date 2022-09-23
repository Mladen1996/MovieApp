import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';


const Header = () =>{
    return(
       <div className="rmdb-header">
            <div className="rmdb-header-content">
            <Link to="/">
            <img className="rmdb-logo" src={window.location.origin+"/images/reactMovie_logo.png"} alt="rmdb-logo" />
                <p>Movie App</p> 
            </Link>
            <nav>
                <ul>
                <Link to="/"><li>Popular</li></Link>
                <Link to="/top-rated"> <li>Top Rated</li></Link>
                <Link to="/upcoming"> <li>Upcoming</li></Link>
                </ul>
            </nav>
            
           </div>
       </div>
    )
}

export default Header;