import React, { useEffect, useState } from "react";
import "./App.css";
export default function App() {
  const [data, setData] = useState([]);
  const [dataClick, setDataClick] = useState(true);
  const [Click, setClick] = useState(false);
  const [Id, setId] = useState({});
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [time, setTime] = useState("");

  const handle = () => {
    localStorage.setItem("Id", document.querySelectorAll("input")[0].value);
    localStorage.setItem(
      "Movie_Name",
      document.querySelectorAll("input")[1].value
    );
    localStorage.setItem(
      "Movie_Lang",
      document.querySelectorAll("input")[2].value
    );
    localStorage.setItem(
      "Movie_Day",
      document.querySelectorAll("input")[3].value
    );
    localStorage.setItem("Fname", name);
    localStorage.setItem("Mobile", number);
    localStorage.setItem("Time", time);
    document.write("Booking Successful");
    // console.log(name);
  };
  useEffect(() => {
    getPost();
  }, []);
  const getPost = async () => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((res) => setData(res));
  };
  const getFetchPost = async (dataClick) => {
    fetch(`https://api.tvmaze.com/shows/${dataClick}`)
      .then((res) => res.json())
      .then((res) => setId(res));
  };
  const handleClick = (data) => {
    const { id } = data?.show;
    getFetchPost(id);
    setDataClick(false);
    setClick(true);
  };
  console.log(Id);
  return (
    <div className="container">
      {/* <form nSubmit={handleSubmitForm}> */}
      {dataClick &&
        data.map((res, index) => (
          <div className="con" key={index}>
            <img
              src={res?.show?.image?.original}
              
              
              className="cen"
            />
            <p>{res?.show.id || "-"}</p>
            <p>{res?.show.name || "-"}</p>
            <p>{res?.show.language || "-"}</p>
            <p>{res?.show?.schedule?.days[0] || "-"}</p>
            <button onClick={() => handleClick(res)}>View Details</button>
          </div>
        ))}
      {Click && (
        <center>
          <div style={{ padding: "10px" }}>
            <img
              src={Id.image?.original}
              height="250px"
              style={{ borderRadius: "10px" }}
              className="aa"
            />
            <div className="cen" style={{ width: "100%", padding: "10px" }}>
              <input
                type="text"
                value={Id.id || "-"}
                name="id"
                readOnly
                className="input_color"
              />
              <input
                type="text"
                value={Id.name || "-"}
                name="name"
                readOnly
                className="input_color"
              />
              <input
                type="text"
                value={Id.language || "-"}
                readOnly
                className="input_color"
              />
              <input
                type="text"
                value={Id.schedule?.days[0] || "-"}
                readOnly
                className="input_color"
              />
              <input
                type="text"
                id="fname"
                name="fnames"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                id="mobile"
                name="mobiles"
                value={number}
                placeholder="Enter your mobile number"
                onChange={(e) => setNumber(e.target.value)}
                maxLength="10"
              />
              <select
                id="slot"
                name="slot"
                onChange={(e) => setTime(e.target.value)}
              >
                <option value="">Movies Time List</option>
                <option value="10:30am-01:30pm">10:30am-01:30pm</option>
                <option value="02:15pm-05:15pm">02:15pm-05:15pm</option>
                <option value="05:25pm-08:25pm">05:25pm-08:25pm</option>
                <option value="08:45:pm-11:45pm">08:45pm-11:45pm</option>
              </select>
              <br />
              <button
                onClick={() => {
                  setDataClick(true);
                  setClick(false);
                }}
              >
                Close
              </button>{" "}
              <br />
              <br /> <button onClick={handle}>Book Tickets</button>
            </div>
          </div>
        </center>
      )}
    </div>
  );
}
