import React, { useState } from "react";
import "./Test.css";

const Test = () => {
  const [image, setImage] = useState(null);
  const handleImageUpload = (event) => {
    console.log(event);
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (upload) => {
      console.group(upload);
      const imageDataURL = upload.target.result;
      setImage(imageDataURL);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="main">
      <input type="file" onChange={handleImageUpload} />
      <br />
      <br />
      <img height={500} width={500} src={image} alt="" />
    </div>
  );
};

export default Test;
