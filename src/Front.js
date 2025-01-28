// src/App.js
import React from 'react';
import m from "./m.jpg";
import fb from "./fb.jpg";
import image1 from "./img1.png";
import image2 from "./image3.png";
import image3 from "./image2.png";
import image4 from "./img4.png";
import insta from "./insta.jpg";
import th1 from "./th1.jpg";
import x from "./x.jpg";
import {Route, Routes} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Main from './Main.js';
import "./Front.css";


function Front() {  
  

  function Gallery(){
    window.location.href='http://localhost:3000/Main';
  }
  

  return (
  
          <div>
          


  
         

            {/* navbar */}
            <nav className="navbar navbar-expand-lg fixed-top">
              <div className="container">
                <div className="row align-items-center w-100">
                  {/* Mystique */}
                  <div className="row">
                    <div className="col-sm-2">
                      <a href="m.jpg" className="d-block">
                        <img src={m} alt="Thumbnail Image" className="img-fluid smaller-image" />
                      </a>
                    </div>
                    <div className="col-sm-2 mt-2 text-light">
                      <h2><em>YSTIQUE</em> </h2>
                    </div>
                  </div>
                  {/* Mystique   */}
                  <div className='top'>
                  
                    <a  href="#Home" className="btn  button">Home</a>
                  
                
                    <a href="#Features" className="btn button">Features</a>
                
                  
                    <Link to="./Main">
                  <button  className="btn ml-4">Gallery</button>
                  </Link>
                  
                  </div>
                </div>
              </div>
            </nav>
            <div style={{paddingTop: '80px'}}>
              <div className="moving-background" style={{background: 'url("m.jpg") repeat'}} />
              {/* Body under navbar */}
              <div className="container-fluid" id="Home">
                <div className="container-fluid m-2" />
                <div className="row m-2">
                  <div className="col-sm-5 text-light custom-border ">
                    <h1><span id="change-text">Photo Editing, Cropping,</span> and <span id="change-text">Adding Filters </span>Made Easy for Everyone</h1>
                    <h6>Mystique's comprehensive online Creative Platform provides a wealth of features to cater to all your creative needs. Seamlessly edit your photos with powerful tools for cropping, zooming, and applying a myriad of filters. Unleash your graphic design prowess as you craft stunning visuals with our versatile suite of design tools. Whether you're enhancing images, cropping with precision, zooming to capture details, or adding artistic filters, Mystique offers an all-encompassing solution for creating captivating photo collages and bringing your creative vision to life.</h6>
                  </div>
                  <div className="col-sm-7">
                    {/* Carousel */}
                    <div id="myCarousel" className="carousel slide" data-ride="carousel" data-interval={1500}>
                      <div className="carousel-inner">
                        <div className="carousel-item active">
                          <img src={image1} className="d-block w-100" alt="Image 1" />
                        </div>
                        <div className="carousel-item">
                          <img src={image2} className="d-block w-100" alt="Image 2" />
                        </div>
                        <div className="carousel-item">
                          <img src={image3} className="d-block w-100" alt="Image 3" />
                        </div>
                        <div className="carousel-item">
                          <img src={image4} className="d-block w-100" alt="Image 4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Features */}
                <div className="mt-5 text-center text-center text-light">
                  <h2>Features</h2>
                </div>
                <div className="container-fluid ml-3 mt-5" id="Features">
                  <div className="row">
                    {/* Container-1 */}
                    <div className="col-sm-4 m-2 container-1 text-light">
                      <h4><strong>Cropping, Rotating, and Basic Editing.</strong></h4>
                      <ul>
                        <li><strong>Cropping Functionality:</strong>
                          <ul>
                            <li>Users can crop images to focus on specific areas or remove unwanted elements.</li>
                          </ul>
                        </li>
                        <li><strong>Rotating Images:</strong>
                          <ul>
                            <li>Precise rotation controls, allowing users to achieve the desired orientation.</li>
                          </ul>
                        </li>
                        <li><strong>Basic Editing Tools:</strong>
                          <ul>
                            <li>Include fundamental editing tools like brightness, contrast, and saturation adjustments.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    {/* Container-2 */}
                    <div className="col-sm-3 text-light m-2 container-2">
                      <h4> <strong> User-Friendly Interface and Additional Features</strong></h4>
                      <ul>
                        <li><strong>Intuitive Controls.</strong>
                        </li>
                        <li>
                          <strong>Editing anywhere : </strong>
                          <ul>
                            <li>You can edit your image in gallery.</li>
                            <li>Upload your image from our database and edit it seemlessly in Mystique.</li>
                            <li>Upload your own image and edit it.</li>
                          </ul>
                        </li>
                        <li><strong>Background Addition:</strong>
                          <ul>
                            <li>Users can customize the background color.</li>
                          </ul>
                        </li></ul></div>
                    {/* Container-3 */}
                    <div className="col-sm-4 m-2 text-light container-3">
                      <h4><strong>Image Sources - Database, Gallery, and User-Added </strong></h4>
                      <ul>
                        <li><strong>Database Integration:</strong>
                          <ul>
                            <li>Retrieve images from a connected database for dynamic and varied content.</li>
                          </ul>
                        </li>
                        <li><strong>Gallery Import:</strong>
                          <ul>
                            <li>Allow users to import images from their device's gallery or local storage.</li>
                          </ul>
                        </li>
                        <li><strong>User-Added Images:</strong>
                          <ul>
                            <li>Users can upload and insert their own images directly onto the platform.</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Contact */}
              </div>
              {/* logos */}
              <div className="container logo mt-5">
                <div className="row justify-content-end">
                  <div className="col-sm-4 social-icons text-right">
                    <a href="https://www.instagram.com/?hl=en" target="_blank" title="Instagram">
                      <img src={insta} alt="Error loading image." />
                    </a>
                    <a href="https://www.facebook.com/" target="_blank" title="Facebook">
                      <img src={fb} alt="Erro loadin Image" />
                    </a>
                    <a href="https://web.whatsapp.com/" target="_blank" title="WhatsApp">
                      <img src={th1} alt="Error loadin image." /> 
                    </a>
                    <a href="https://www.x.com/" target="_blank" title="Twitter">
                      <img src={x} alt="Error" /> 
                    </a>
                  </div>
                </div>
              </div>
              {/* logos */}
            </div>

            {/* <img src={m}></img> */}
            
            </div>
        );

}

export default Front;
