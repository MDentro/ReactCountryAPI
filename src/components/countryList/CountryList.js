import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Dropdown from '../DropDown/Dropdown'
import Search from '../search/Search'
import './CountryList.css'
import LoadingSpinner from '../loadingSpinner/LoadingSpinner'

const CountryList = ({ setCountryName, toggleShowCountryList }) => {
  const [result, setResult] = useState([])
  const [keyword, setKeyword] = useState('')
  const [originalData, setOriginalData] = useState([])
  const [selected, setSelected] = useState('Filter by region')
  const [resetFunction, toggleResetFunction] = useState(false)
  const [loading, toggleLoading] = useState(false)
  const [error, toggleError] = useState(false)

  useEffect(() => {
    async function fetchData() {
      toggleError(false)
      toggleLoading(true)
      try {
        const { data } = await axios.get(`https://restcountries.com/v3.1/all`)

        data.sort((a, b) => {
          let fa = a.name.common.toLowerCase(),
            fb = b.name.common.toLowerCase()

          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })

        setResult(data)
        setOriginalData(data)
      } catch (e) {
        console.error(e)
        toggleError(true)
      }
      toggleLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    function resetCountryList() {
      setResult(originalData)
      if (keyword !== 'All') {
        toggleResetFunction(true)
      }
    }

    if (keyword !== '') {
      resetCountryList()
    }
  }, [keyword])

  useEffect(() => {
    if (resetFunction) {
      filterCountryList()
    }
  }, [resetFunction])

  function filterCountryList() {
    const newCountryList = result.filter(
      (country) => country.region === keyword
    )
    setResult(newCountryList)
    toggleResetFunction(false)
  }

  function displayCountry(country) {
    setCountryName(country)
    toggleShowCountryList(false)
  }

  return (
    <div className="country-list-container">
      <div className="search-container">
        <Search
          setCountryName={setCountryName}
          toggleShowCountryList={toggleShowCountryList}
        />
        <Dropdown
          selected={selected}
          setSelected={setSelected}
          setKeyword={setKeyword}
        />
      </div>

      <div className="country-summary-container">
        {!loading &&
          result?.map((country, index) => {
            const {
              name: { common: commonCountryName },
              flags: { png: flagImage },
              population,
              region,
              capital,
            } = country

            return (
              <div
                className="country-summary-wrapper"
                key={`${commonCountryName}`}
                onClick={() => displayCountry(commonCountryName)}>
                <div className="flag-wrapper">
                  <img src={flagImage} alt="flag" />
                </div>
                <div className="country-content-summary-wrapper">
                  <p className="title" key={`${commonCountryName + index}`}>
                    {commonCountryName}
                  </p>
                  <p key={`${population + index}`}>
                    Population:{' '}
                    <span>
                      {population
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </span>
                  </p>
                  <p key={`${region + index}`}>
                    Region: <span>{region}</span>
                  </p>
                  <p key={`${capital}`}>
                    Capital: <span>{capital}</span>
                  </p>
                </div>
              </div>
            )
          })}
      </div>

      {error && !loading && (
        <div className="error-container">
          <p>Something went wrong. Please try again later.</p>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      )}
    </div>
  )
}

export default CountryList
