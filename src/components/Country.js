import React from "react";
import findCountry from "../helpers/findCountry";

const Country = ({ data, setName }) => {
  const {
    flags,
    name,
    population,
    region,
    subregion,
    capital,
    tld,
    languages,
    borders,
    currencies,
    cca3,
  } = data;

  function displayBorderCountry(border) {
    console.log("border", border);
    setName(border);
    afkorting(border);
  }

  function afkorting(border) {
    console.log("wat zou dit zijn", cca3, border);

    findCountry(border, setName);

    // const changeName = () => {
    //   const findCountry = result.filter((country) => country.cca3 === border);
    //   setName(findCountry);
    // };

    // console.log(cca3, changeName());
  }

  return (
    <>
      {console.log(data)}

      <img src={flags.png} alt="flag"></img>
      <p>{name.common}</p>
      {/* <p>{name.nativeName.countryCode.common}</p> */}
      <p>Population: {population}</p>
      <p>Region: {region}</p>
      <p>Sub Region: {subregion}</p>
      <p>Capital: {capital}</p>
      <p>Top Level Domain: {tld[0]}</p>
      {currencies && (
        <ul>
          Currencies:
          {Object.entries(currencies).map(([key, value]) => {
            return <li key={`${value.name}`}>{value.name}</li>;
          })}
        </ul>
      )}

      {languages && (
        <div>
          <ul>
            Languages:
            {Object.entries(languages).map(([key, value]) => {
              return <li key={`${value}`}>{value}</li>;
            })}
          </ul>
        </div>
      )}

      {borders && (
        <ul>
          Border Countries:
          {borders.map((border) => {
            return (
              <button
                key={`${border}`}
                onClick={() => displayBorderCountry(border)}
              >
                {border}
              </button>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Country;
