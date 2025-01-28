import React, { useState, useRef, useEffect } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './Secondpage.css';

function Secondpage() {
  const editorRef = useRef(null);
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [colorOverlay, setColorOverlay] = useState([255, 255, 255, 0.6]); // RGBA
  const [previousImage, setPreviousImage] = useState(null);
  
  const [error, setError] = useState('');
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const selectedFile = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

  };

  const handleFileChangee = (e) => {
    const selectedFile = e.target.files[0];

  if (selectedFile) {
    // Check if the selected file is an image
    if (selectedFile.type.startsWith('image/')) {
      setImage(selectedFile);
      
    } else {
      // Display error message for non-image files
      setImage(null);
      setError('Please select a valid image file.');
      // Throw an alert for non-image files
      alert('Please select a valid image file.');

      // Reset the input field
      e.target.value = null; // Resetting the input value
    }}
  };

  



  const handleResetCrop = () => {
    // Reset the crop width and height to default values
    setCropWidth(300);
    setCropHeight(300);
    setSaturation(100);
    setContrast(100);
    setBrightness(100);
    setColorOverlay([255, 255, 255, 0.6]);
    // Reset the rotate value to 0
    setRotate(0);
   setImage(previousImage)
  };

  

//zoom
  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleRotateChange = (e) => {
    setRotate(parseFloat(e.target.value));
  };

  const handleColorChange = (e) => {
    // Example: Allow users to set color overlay using an input
    const colorHex = e.target.value;
    const rgbaArray = hexToRGBA(colorHex);
    setColorOverlay(rgbaArray);
  };
  


  const hexToRGBA = (hex) => {
    // Convert hexadecimal color to RGBA array
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b, 1]; // Alpha initially set to 1
  };

//saturation
const [saturation, setSaturation] = useState(100);
const handleSaturationChange = event => {
  setSaturation(event.target.value);
};
//contrast
const [contrast, setContrast] = useState(100);
const handleContrastChange = event => {
  setContrast(event.target.value);
};

//brightness
const [brightness, setBrightness] = useState(100);

const handleBrightnessChange = event => {
  setBrightness(event.target.value);
};




  //crop
  const [cropWidth, setCropWidth] = useState(300); // Default crop width
  const [cropHeight, setCropHeight] = useState(300); // Default crop height

  const handleCrop = () => {
    if (editorRef.current) {
      const originalCanvas = editorRef.current.getImageScaledToCanvas();
      const originalContext = originalCanvas.getContext('2d');
  
      // Create a temporary canvas for drawing and clearing
      const tempCanvas = document.createElement('canvas');
      const tempContext = tempCanvas.getContext('2d');
      tempCanvas.width = originalCanvas.width;
      tempCanvas.height = originalCanvas.height;
  
      // Draw the original image onto the temporary canvas
      tempContext.drawImage(originalCanvas, 0, 0);
  
      // Apply rotation to the temporary canvas
      tempContext.translate(tempCanvas.width / 2, tempCanvas.height / 2);
      tempContext.rotate((rotate * Math.PI) / 180);
      tempContext.drawImage(tempCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
      tempContext.rotate((-rotate * Math.PI) / 180);
      tempContext.translate(-tempCanvas.width / 2, -tempCanvas.height / 2);
  
      // Calculate the cropping dimensions
      const cropX = (tempCanvas.width - cropWidth) / 2;
      const cropY = (tempCanvas.height - cropHeight) / 2;
  
      // Crop the image based on user-specified width and height
      const croppedCanvas = document.createElement('canvas');
      const croppedContext = croppedCanvas.getContext('2d');
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      croppedContext.drawImage(
        tempCanvas,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );
  
      // Set the fully cropped image as the new image data
      const croppedImageData = croppedCanvas.toDataURL();
      setImage(croppedImageData);
  
      // Update the visible canvas in the AvatarEditor component
      originalContext.clearRect(0, 0, originalCanvas.width, originalCanvas.height);
      originalContext.drawImage(croppedCanvas, 0, 0);
    }
  };

  
  
  
//download
  const handleDownload = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const link = document.createElement('a');
      link.download = 'Editedimage.png';
      
      // Apply brightness, saturation, and contrast to the canvas
      const context = canvas.getContext('2d');
      context.filter = `brightness(${brightness}%) saturate(${saturation}% ) contrast(${contrast}%)`;
      context.drawImage(canvas, 0, 0, canvas.width, canvas.height);

      link.href = canvas.toDataURL();
      link.click();
    }
  };
  
  //sharing
  const handleShare = async () => {
    // Check if the Web Share API is supported
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Editted Image',
          text: 'Check my editted image!',
          url: Image,
        });
      } catch (error) {
        console.error('Error sharing:', error.message);
      }
    } else {
      console.error('Web Share API not supported');
    }
  };


  

  
  return (
    <div className='maindiv'>
      <header>
     <div>
     <h1>PHOTO EDITOR</h1>
    <p>"Capture, Edit, Impress"</p>
     </div>
    </header>
     <div className='innerdiv'>
      

    <input type="file"accept="image/*" onChange={(e) => {
    setImage(e.target.files[0]);
    handleFileChangee(e);
  }}  />
      {image && (
       


        <>
          <AvatarEditor
            ref={editorRef}
            image={image}
            width={1000}
            height={500}
            border={5}
            color={colorOverlay}
            scale={scale}
            rotate={rotate}
            style={{
              filter: `brightness(${brightness}%) saturate(${saturation}% ) contrast(${contrast}%)`,
            }}
            className='div1'
            
          />
      
       <div className='div2 singleline'>
          <div >
            <label>Zoom:</label>
            <input
              type="range"
              min="1"
              max="3"
              step="0.01"
              value={scale}
              onChange={handleScaleChange}
            />
          </div>
         
          <div  className='singleline' >
            <label>Rotate:</label>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotate}
              onChange={handleRotateChange}
            />
          </div>
        
          <div  className='singleline' >
            <label>Color Overlay:</label>
            <input
              type="color"
              value={`#${colorOverlay.slice(0, 3).map(c => c.toString(16).padStart(2, '0')).join('')}`}
              onChange={handleColorChange}
            />
          </div >
          <div  className='singleline'>
								<label htmlFor="option1">Brightness</label>
								<input
									type="range"
									min="0"
									max="200"
									value={brightness}
									onChange={handleBrightnessChange}
								/>
								</div>
								<div  className='singleline'>
									<label htmlFor="saturation">Saturation: {saturation}%</label>
									<input
										type="range"
										id="saturation"
										min="0"
										max="200"
										value={saturation}
										onChange={handleSaturationChange}
									/>
								</div>
							
							<div className='singleline' >
								<label htmlFor="contrast">Contrast: {contrast}%</label>
								<input
									type="range"
									id="contrast"
									min="0"
									max="200"
									value={contrast}
									onChange={handleContrastChange}
								/>
							</div >
             
              
      
              <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCrop();
        }}
      >
        {/* <label>
          Crop Width:
          <input
            type="number"
            value={cropWidth}
            onChange={(e) => setCropWidth(parseInt(e.target.value, 10))}
          />
        </label> */}

        {/* <label>
          Crop Height:
          <input
            type="number"
            value={cropHeight}
            onChange={(e) => setCropHeight(parseInt(e.target.value, 10))}
          />
        </label> */}


   <div className='child'>
   <button className='download' type="submit">Crop</button>
   </div>
       
      </form>

<div  className='child'>
            <button className='download' onClick={handleShare}>Share</button>
          </div>


          <div  className='child'>
            <button className='download' onClick={handleDownload}>Download</button>
          </div>
          </div>
        </>
      )}
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
    
  );}

export default Secondpage;
