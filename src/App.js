import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import "./App.css";
import InfoBox from "./components/InfoBox";
import ActiveCases from "./components/ActiveCases";
import { sortData } from "./components/Util";

import Chart from "./components/Chart";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [flag, setFlag] = useState("");
  const [countryName, setCountryName] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
            flag: country.countryInfo.flag,
          }));

          setCountries(countries);
          setTableData(sortData(data));
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    if (countryCode !== "worldwide") {
      countries.map((ele) => {
        if (ele.value === countryCode) {
          setFlag(ele.flag);
          setCountryName(ele.name);
        }
      });
    }

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
  };
  const chartData = [
    { name: "Infected", value: countryInfo.cases, fill: "#ffa500" },
    { name: "Recovered", value: countryInfo.recovered, fill: "#228b22" },
    { name: "Deaths", value: countryInfo.deaths, fill: "#FF0000" },
  ];
  return (
    <div className="App">
      <h1
        style={{
          fontFamily: "monospace",
          fontWeight: "bolder",
          fontSize: "50px",
        }}
      >
        Corona Tracker
      </h1>
      <div className="app_header">
        <FormControl className="app_dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* loop through all countries and display as a dropdown list */}
            {countries.map((country) => (
              <MenuItem
                style={{ fontWeight: "bolder", fontSize: "21px" }}
                value={country.value}
              >
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="app_stats">
        {flag !== "" ? (
          <div className="flagBox">
            <img width="185px" height="100px"  src={flag} alt="Country Flag" />
            <h1
              style={{
                padding: "5px",
                fontWeight: "bolder",
                textAlign: "center",
                fontSize: "23px",
                fontFamily: "unset",
              }}
            >
              {countryName}
            </h1>
          </div>
        ) : (
          ""
        )}

        <InfoBox
          title="Coronavirus Cases"
          cases={countryInfo.todayCases}
          total={countryInfo.cases}
          boxStyle="infectedYellow"
          fontColor="#FFA500"
        />
        <InfoBox
          title="Recovered"
          cases={countryInfo.todayRecovered}
          total={countryInfo.recovered}
          boxStyle="recoveredGreen"
          fontColor="#228B22"
        />
        <InfoBox
          title="Deaths"
          cases={countryInfo.todayDeaths}
          total={countryInfo.deaths}
          boxStyle="deathsRed"
          fontColor="red"
        />
        <InfoBox
          title="Critical"
          cases={countryInfo.critical}
          boxStyle="criticalOrange"
          fontColor="#793c32"
        />
      </div>

      <div className="chartWrapper">
        <Card className="app__right">
          <CardContent>
            <div className="app__information">
              <h2>Overall Cases</h2>
              <ActiveCases countries={tableData} />
            </div>
          </CardContent>
        </Card>

        <Chart chartData={chartData} />
      </div>
    </div>
  );
}

export default App;
