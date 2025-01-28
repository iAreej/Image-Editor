import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Main from './Main.js';
import Secondpage from './Secondpage.js';
import Front from './Front.js';
import "./Main.css";
import "./App.css";
import "./Secondpage.css";
function App(){
return(
    <div>
         <>
        <Routes>
        <Route exact path='/'  element={<Front/>}  />
        <Route path='/Main' element={<Main/>}  />
        <Route path='/Secondpage' element={<Secondpage/>}  />
       </Routes> 
       </>
       <body className=''>
       </body>
    </div>
)
}
export default App;