import React, { useState, useEffect } from "react";
import "./App.css";
// import Button from "./components/CustomButtonComponent";
const url = "https://lit-wave-20923.herokuapp.com/";

const getTitleData = async () => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};
const App = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [release, setRelease] = useState("");
  const [titleData, setTitleData] = useState([]);
  const [current, setCurrent] = useState({
    title: "",
    rating: "",
    release: "",
  });

  useEffect(() => {
    getTitleData().then(setTitleData);
  }, []);

  const handleClick = async () => {
    try {
      if (titleData.length > 0) {
        let randomTitle: number = Math.floor(Math.random() * titleData.length);
        const { title, rt_score, release_date } = titleData[randomTitle];
        setCurrent({ title: title, rating: rt_score, release: release_date });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="application">
      <div className="homepage-bgimage">
        <div className="centered">
          <h1>Stuido Ghibli Films Random Generator</h1>
          <h3>{current.title}</h3>
          <p>
            {!(current.title.length === 0) ? `was released in ${current.release} and scored a ${current.rating}`: "Click the button to get a random title!"}
          </p>
          {/* {titleData.length > 0 ? titleData.map((title)=><li><pre>{JSON.stringify(title, null, 2)}</pre></li>) :""} */}
          <br/>
          {/* <p>Title: {title}</p>
          <p>Rating: {rating}</p>
          <p>Year Released: {release}</p> */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleClick}
          >
            Primary
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
