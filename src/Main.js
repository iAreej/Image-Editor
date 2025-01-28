import WSPGallery from './components/WSPGallery';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import './Main.css';
import Secondpage from './Secondpage';
import { Link } from 'react-router-dom';

function Main() {
  const [galleryImages, setgalleryImages] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:3001/hello').then((response)=>
    {
      console.log(response.data);
      setgalleryImages(response.data);
      

      console.log(galleryImages);
    });
  
  },[]);
  function changepage(){
    window.location.href='http://localhost:3000/Secondpage';
   }

  
  return (
    
      <div className="App">
        <link
        href="https://fonts.googleapis.com/css?family=Roboto:100"
        rel="stylesheet"
      />
       <header>
     <div>
     <h1>PHOTO EDITOR</h1>
    <p>"Capture, Edit, Impress"</p>
     </div>
    </header>
      <WSPGallery
        galleryImages={galleryImages}
      />
      <br /><br />
      <div className='Functionality'>

<Link to={Secondpage}> 
   <button  className='download' onClick={changepage}>Do you want to insert your own file?</button> 
   </Link>
</div>
<div className="light x1"></div>
      <div className="light x2"></div>
      <div className="light x3"></div>
      <div className="light x4"></div>
      <div className="light x5"></div>
      <div className="light x6"></div>
      <div className="light x7"></div>
      <div className="light x8"></div>
      <div className="light x9"></div>
    </div>

    
    
    
  );
}

export default Main;
