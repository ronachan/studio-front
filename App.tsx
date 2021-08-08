import React, {useState } from 'react';
import './App.css';
import Button from "./components/CustomButtonComponent";

const App = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [release, setRelease] = useState("");

  const handleClick = async() => {
    const url = "https://lit-wave-20923.herokuapp.com/";

    try {
      const response = await fetch(url);
      const json = await response.json();
      let randomTitle: number = Math.floor(Math.random()*json.length);
      setTitle(json[randomTitle].title);
      setRating(json[randomTitle].rt_score);
      setRelease(json[randomTitle].release_date);
    }catch(error){
      console.log("error", error);
    }
  }

  return (
    <div className="container">
      <div className="homepage-bgimage">
        <div className = "centered">
        <h1>Stuido Ghibli Films Random Generator</h1>
          <p>Title: {title}</p>
          <p>Rating: {rating}</p>
          <p>Year Released: {release}</p>
        <Button 
          border = "none"
          color = "pink"
          height = "65px"
          onClick = {handleClick}
          radius = "25%"
          width = "150px"
          children = "Random"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
