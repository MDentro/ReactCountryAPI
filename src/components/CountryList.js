import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";

const CountryList = ({ setName }) => {
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`https://restcountries.com/v2/all`);
        setResult(data);
        console.log(data);
        setOriginalData(data);
      } catch (e) {
        console.error(e);
      }
    }

    fetchData();
  }, []);

  let resetFunction = false;

  function reset() {
    const interval = setInterval(() => {
      setResult(originalData);
      if (result.length === 250) {
        console.log("restNu");
        clearInterval(interval);
        resetFunction = true;
      }
    }, 1000);

    // if (result.length < 250) {
    //   console.log("aangeroepen", originalData);
    //hier wordt setResult niet gereset, maar ik snap niet waarom
    // setResult(originalData);
  }

  function change() {
    // if (keyword === "All") {
    //   console.log("nu all");
    //reset();
    // console.log("all");
    // const interval = setInterval(() => {
    //   setResult(originalData);
    //   if (result.length === 250) {
    //     clearInterval(interval);
    //   }
    // }, 1000);
    // }

    if (keyword !== "") {
      // console.log("weer hier");
      // const interval = setInterval(() => {

      reset();
      //   console.log("This will run every second!");
      //   console.log("weer hier2", result.length);
      //   if (result.length === 250) {
      const interval = setInterval(() => {
        if (resetFunction === true) {
          const changeResult = () => {
            console.log("aangeroepennnn", keyword);
            const newCountryList = result.filter(
              (country) => country.region === keyword
            );

            console.log("aangeroepennnnLater", keyword);
            setResult(newCountryList);
            //clearInterval(interval);
          };
          changeResult();
          clearInterval(interval);
          resetFunction = false;
          //   }
          // }, 1000);
        }
      }, 1000);
    }
  }

  useEffect(() => {
    // setResult(originalData);
    console.log("ta");
    change();
  }, [keyword]);

  function searchCountry(country) {
    setName(country);
  }

  return (
    <div>
      <Dropdown setKeyword={setKeyword} />
      {result &&
        result.map((bloc, index) => {
          return (
            <div key={`${bloc.name}`} onClick={() => searchCountry(bloc.name)}>
              <img src={bloc.flags.png} alt="flag"></img>
              <li key={`${bloc.name + index}`}>{bloc.name}</li>
              <li key={`${bloc.population + index}`}>{bloc.population}</li>
              <li key={`${bloc.region + index}`}>{bloc.region}</li>
              <li key={`${bloc.capital}`}>{bloc.capital}</li>
            </div>
          );
        })}
    </div>
  );
};

export default CountryList;
