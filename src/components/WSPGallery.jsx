import { useState, useEffect } from "react";
import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Jimp from 'jimp'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCircleChevronLeft,
	faCircleChevronRight,
	faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "./wsp-gallery.css";
import { Link } from "react-router-dom";
import Secondpage from "../Secondpage";

const WSPGallery = ({ galleryImages }) => {
	
	const [slideNumber, setSlideNumber] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = index => {
		setSlideNumber(index);
		setOpenModal(true);
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

	// Close Modal
	const handleCloseModal = () => {
		setOpenModal(false);
		resetCropping();
	};

//reset Avatar
const resetAvatarEditor = () => {
	setScale(1);
	setRotate(0);
	setColorOverlay([255, 255, 255, 0.6]);
  };
  const resetCropping = () => {
    setScale(1);
    setRotate(0);
    setColorOverlay([255, 255, 255, 0.6]);
    setSaturation(100);
    setContrast(100);
    setBrightness(100);
    setCropWidth(400);
    setCropHeight(400);
    setCroppedImage(null);
  };




	// Previous Image
	const prevSlide = () => {
		resetAvatarEditor(); 
		resetCropping();
		
	  
		slideNumber === 0
			? setSlideNumber(galleryImages.length - 1)
			: setSlideNumber(slideNumber - 1);
	};

	// Next Image
	const nextSlide = () => {
		resetAvatarEditor(); 
		resetCropping();
		
		
		slideNumber + 1 === galleryImages.length
			? setSlideNumber(0)
			: setSlideNumber(slideNumber + 1);
	};
	
	const editorRef = useRef(null);
	const [image, setImage] = useState(null);
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);
	const [colorOverlay, setColorOverlay] = useState([255, 255, 255, 0.6]); // RGBA
	

	const handleScaleChange = e => {
		setScale(parseFloat(e.target.value));
	};

	const handleRotateChange = e => {
		setRotate(parseFloat(e.target.value));
	};

	const handleColorChange = e => {
		// Example: Allow users to set color overlay using an input
		const colorHex = e.target.value;
		const rgbaArray = hexToRGBA(colorHex);
		setColorOverlay(rgbaArray);
	};

	const applyColorOverlay = (canvas, color) => {
		const context = canvas.getContext("2d");
		context.fillStyle = `rgba(${color.join(",")})`;
		context.fillRect(0, 0, canvas.width, canvas.height);
	};

	const hexToRGBA = hex => {
		// Convert hexadecimal color to RGBA array
		const bigint = parseInt(hex.slice(1), 16);
		const r = (bigint >> 16) & 255;
		const g = (bigint >> 8) & 255;
		const b = bigint & 255;
		return [r, g, b, 1]; // Alpha initially set to 1
	};

//crop
const [cropWidth, setCropWidth] = useState(400); // Default crop width
  const [cropHeight, setCropHeight] = useState(400); // Default crop height
  const [croppedImage, setCroppedImage] = useState(null);
 
  const handleCropFullScreen = () => {
	

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

      // Calculate the cropping dimensions based on the original image size
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
      setCroppedImage(croppedImageData);


	  // Use the callback form of setState to ensure state is updated before proceeding
	  setCroppedImage(croppedImageData, () => {
		// Now you can proceed with other actions, such as updating slideNumber
		resetAvatarEditor(); // Optionally reset other editor settings
  
		// Use a callback function with setSlideNumber to ensure state is updated before proceeding
		setSlideNumber((prevSlideNumber) => (prevSlideNumber + 1) % galleryImages.length);
	  });

    }
	
	
  };

 
  











//download
const handleDownload = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const link = document.createElement('a');
      link.download = 'avatar.png';
      
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
		<div>
			{openModal && (
				<div className="sliderWrap">
					<FontAwesomeIcon
						icon={faCircleXmark}
						className="btnClose"
						onClick={handleCloseModal}
					/>
					<FontAwesomeIcon
						icon={faCircleChevronLeft}
						className="btnPrev"
						onClick={prevSlide}
					/>
					<FontAwesomeIcon
						icon={faCircleChevronRight}
						className="btnNext"
						onClick={nextSlide}
					/>
					<div className="fullScreenImage">
						{/* <img src={galleryImages[slideNumber].ImageLinks} alt='' /> */}
						<AvatarEditor
							 ref={editorRef}
							//ref={imageRef}
							// image={galleryImages[slideNumber].ImageLinks}
							image={croppedImage || galleryImages[slideNumber].ImageLinks}
							width={1300}
							height={600}
							border={10}
							color={colorOverlay}
							scale={scale}
							rotate={rotate} 
							className="fullScreenImage"
							crossOrigin="anonymous"
							style={{
								filter: `brightness(${brightness}%) saturate(${saturation}% ) contrast(${contrast}%)`,
							}}
							

						/>
					</div>

					<footer className="Functionalities">
						<>
		
						
						

							<div className="singleline">
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
							<div className="singleline">
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

							<div className="singleline">
								<label>Color Overlay:</label>
								<input
									type="color"
									value={`#${colorOverlay
										.slice(0, 3)
										.map(c => c.toString(16).padStart(2, "0"))
										.join("")}`}
									onChange={handleColorChange}
								/>
							</div>

							<div  className="singleline">
								<label htmlFor="option1">Brightness</label>
								<input
									type="range"
									min="0"
									max="200"
									value={brightness}
									onChange={handleBrightnessChange}
								/>
								</div>
								<div className="singleline" >
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
							
							<div className="singleline">
								<label htmlFor="contrast">Contrast: {contrast}%</label>
								<input
									type="range"
									id="contrast"
									min="0"
									max="200"
									value={contrast}
									onChange={handleContrastChange}
								/>
							</div>

							
							<div>
							<button className="btn" onClick={handleCropFullScreen}>Crop</button>
							</div>
							<div  >
            <button className='btn' onClick={resetCropping}>Undo</button>
          </div>

<div >
<button className="btn"  onClick={handleShare}>Share</button>
</div>
							
                        
							
                <div>
                <button className="btn" onClick={handleDownload}>Download</button>
                </div>
							
						</>
					</footer>
				</div>
			)}

			<div className="galleryWrap">
				{galleryImages &&
					galleryImages.map((slide, index) => {
						return (
							<div
								className="single"
								key={index}
								onClick={() => handleOpenModal(index)}
							>
								<img src={slide.ImageLinks} alt="" />
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default WSPGallery;
