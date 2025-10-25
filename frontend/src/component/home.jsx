import React, { useEffect, useState } from 'react';
import axios from 'axios'
const Home = () => {
     const [data, setData] = useState([]);
     useEffect(() => {
          axios.get('http://localhost:2030/stats')
               .then(res => {
                    console.log(res)
               setData(res.data)
               })
          .catch(err=>{console.log(err)})
     },[])
     return (
          <div>
               <div className="hello">
           {data.map((stat, index) => {
             return <div className='test' key={index}>
               <p>{stat.studentno}</p>
             </div>;
           })}
          </div>
          </div>
     );
}

export default Home;
