import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap";
const url = "https://lit-wave-20923.herokuapp.com/";

const getTitleData = async () => {
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const MyTitleList = (props: {
  moreData: string;
  titleData: {
    title: string;
    description: string;
    release_date: string;
    rt_score: string;
  }[];
}) => {
  console.log(props);
  return (
    <table className="table table-bordered table-hover all-data-table px-3">
      <thead>
        <tr>
          <th scope="col">Film Title</th>
          <th scope="col">Description</th>
          <th scope="col">Year Released</th>
          <th scope="col">Rating</th>
        </tr>
      </thead>
      <tbody>
        {props.titleData.map(
          (title: {
            title: string;
            description: string;
            release_date: string;
            rt_score: string;
          }) => {
            return (
              <tr>
                <td>{title.title}</td>
                <td>{title.description}</td>
                <td>{title.release_date}</td>
                <td>{title.rt_score}</td>
              </tr>
            );
          }
        )}
      </tbody>
    </table>
  );
};

const App = () => {
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
        <div>
          {/* <div className="centered-top"> */}
          <h1 className="py-5">Stuido Ghibli Films Random Generator</h1>
          <div className="bg-frosty container rounded transition-all">
            <h3>{current.title}</h3>
            <p className='my-1'>
              {!(current.title.length === 0)
                ? `was released in ${current.release} and scored a ${current.rating}`
                : "Click the button to get a random title!"}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-primary my-5"
            onClick={handleClick}
          >
            Random Film
          </button>
        </div>
        <div className="container">
          <MyTitleList titleData={titleData} moreData={"i am more data"} />
        </div>
      </div>
    </div>
  );
};

export default App;
