import React, { useState, useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

const Newpost = () => {
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (upload) => {
      const imageDataURL = upload.target.result;
      setImage(imageDataURL);
    };
    reader.readAsDataURL(file);
  };

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const handleImage = async () => {
    const detections = await faceapi
      .detectAllFaces(imageRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const canvas = faceapi.createCanvasFromMedia(imageRef.current);
    faceapi.matchDimensions(canvas, imageRef.current);

    const resizedDetections = faceapi.resizeResults(
      detections,
      imageRef.current
    );
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    faceapi.draw.drawDetections(canvas, resizedDetections);
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

    canvasRef.current.innerHTML = "";
    canvasRef.current.appendChild(canvas);
  };

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);

      imageRef.current && handleImage();
    };

    loadModels();
  }, []);

  return (
    <div className="App">
      <div className="main">
        <input type="file" onChange={handleImageUpload} />
        <img
          crossOrigin="anonymous"
          ref={imageRef}
          src={image}
          alt=""
          height={500}
          width={500}
        />
        <div ref={canvasRef} className="canvas"></div>
      </div>
    </div>
  );
};

export default Newpost;
