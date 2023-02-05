import React, {useState, useEffect} from 'react';
import './App.css';
import TimaBlaq from "./store/assets/images/timablaq.jpeg";

const App = () => {

  const [data, setData] = useState(null);


  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="App">
      <img src={TimaBlaq} alt="timablaq logo" className="img-fluid" />
        <h1>Hair By Tima Blaq</h1>
        <p>{!data ? "Loading..." : data}</p>
    
    </div>
  );
}

export default App;
