import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BorderCountryButton from '../borderCountryButton/BorderCountryButton'
import './Country.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const Country = ({ countryName, setCountryName, returnToCountryList }) => {
  const [result, setResult] = useState()
  const [loading, toggleLoading] = useState(false)
  const [error, toggleError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function fetchData() {
      toggleError(false)
      toggleLoading(true)
      try {
        const { data } = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        )
        setResult(data[0])
      } catch (e) {
        console.error(e)
        setErrorMessage(e?.response?.data?.message)
        toggleError(true)
      }
      toggleLoading(false)
    }
    if (countryName) {
      fetchData()
    }
  }, [countryName])

  return (
    <div className="country-container">
      {result && !loading && (
        <>
          <section className="button-flag-wrapper">
            <button
              onClick={() => returnToCountryList()}
              className="back-button">
              <FontAwesomeIcon icon={faArrowLeft} className="button-arrow" />
              Back
            </button>

            {result && (
              <img src={result.flags.png} alt="flag" className="flag"></img>
            )}
          </section>

          <section className="country-content-wrapper">
            <p className="country-title">{result.name.common}</p>
            <div className="country-content-container">
              <div className="country-box">
                <section className="country-wrapper">
                  <p>
                    Population: &nbsp;
                    <span>
                      {result.population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  </p>
                  <p>
                    Region: &nbsp; <span>{result.region}</span>
                  </p>
                  <p>
                    Sub Region: &nbsp; <span>{result.subregion}</span>
                  </p>
                  <p>
                    Capital: &nbsp; <span>{result.capital}</span>
                  </p>
                </section>

                <section className="country-wrapper">
                  {result.tld && (
                    <p>
                      Top Level Domain: &nbsp; <span>{result.tld[0]}</span>
                    </p>
                  )}
                  {result.currencies && (
                    <div>
                      <p>
                        Currencies: &nbsp;
                        {Object.entries(result.currencies).map(([_, value]) => {
                          return <span key={`${value.name}`}>{value.name}</span>
                        })}
                      </p>
                    </div>
                  )}

                  {result.languages && (
                    <div>
                      <p>
                        Languages: &nbsp;
                        {Object.entries(result.languages).map(([_, value]) => {
                          return <span key={`${value}`}>{value}</span>
                        })}
                      </p>
                    </div>
                  )}
                </section>
              </div>
              <section className="country-wrapper">
                {result.borders && (
                  <div>
                    <p>Border Countries:</p>
                    {result.borders.map((borderCountryCode) => {
                      return (
                        <BorderCountryButton
                          borderCountryCode={borderCountryCode}
                          setCountry={setCountryName}
                          data={result}
                          key={`${borderCountryCode}`}
                        />
                      )
                    })}
                  </div>
                )}
              </section>
            </div>
          </section>
        </>
      )}

      {error && !loading && (
        <div className="error-container-country">
          {errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <p>Something went wrong. Please try again later.</p>
          )}
          <button onClick={() => returnToCountryList()} className="back-button">
            <FontAwesomeIcon icon={faArrowLeft} className="button-arrow" />
            Back
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-container-country">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default Country
