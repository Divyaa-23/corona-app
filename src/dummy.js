import { useState, useEffect } from "react";
import React from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({});
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  // this will work for the first time only
  useEffect(() => {
    fetchCountries();
  }, []);


  //for the drop down
  useEffect(() => {
    if (selectedCountry) {
      fetchData(selectedCountry);
    }
  }, [selectedCountry]);


  // once we got all the countries then we will call  fetchData(countries[0].name);
  useEffect(() => {
    if (countries.length > 0) {
   /*    debugger; */
      setSelectedCountry(countries[0].name);
      fetchData(countries[0].name);
    }
  }, [countries]);

  const fetchData = (countryName) => {
    fetch("https://covid19.mathdro.id/api/countries/" + countryName)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.confirmed.value);
        setData(data);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  const fetchCountries = () => {
    fetch("https://covid19.mathdro.id/api/countries/")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  const selectCountryDropDown = (item) => {
    debugger;
    setSelectedCountry(item.target.value);
  };

  return (
    <div className="App">
      <label>Choose a country: </label>
      <select name="countrySelection" id="countrySelection" onChange={selectCountryDropDown}>
        {countries.map((country) => {
          return (
            <option key={country.name} value={country.name}>
              {country.name}
            </option>
          );
        })}
      </select>
      <h1>Corona App ({selectedCountry || ""})</h1>
      {data ? (
        <div>
          <h2>Coronavirus Cases</h2>
          <h3>{data.confirmed?data.confirmed.value:0}</h3>
          <h2>Recovered</h2>
          <h3>{data.recovered?.value}</h3>
          <h2>Deaths</h2>
          <h3>{data.deaths?.value}</h3>
          <button class="btn btn-primary rounded-full">daisyUI Button customized</button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
