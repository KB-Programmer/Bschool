import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
     return (
       <div>
          <div className="body">
         <div className="navbar">
           <h1>Bschool</h1>
           <ul>
             <li>
               <Link to="/home">Dashboard</Link>
             </li>
             <li>
               <Link to="/student">Student</Link>
             </li>
             <li>
               <Link to="/class">Class</Link>
             </li>
             <li>
               <Link to="/section">Section</Link>
             </li>
           </ul>
           <h2>
             <Link to="/logout">Logout</Link>
           </h2>
               </div>
               <Outlet></Outlet>
       </div>
     );
}

export default Navbar;
