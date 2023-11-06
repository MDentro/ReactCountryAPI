import React, { useState, useEffect } from 'react'
import './App.css'
import Country from './components/country/Country'
import CountryList from './components/countryList/CountryList'
import Header from './components/header/Header'

// eventueel hier kijken: https://www.youtube.com/watch?v=vwZtmHSa9OY

function App() {
  const [countryName, setCountryName] = useState()
  const [showCountryList, toggleShowCountryList] = useState(true)

  const [theme, setTheme] = useState('')

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'))
    const mode = localStorage.getItem('isDarkMode')
    if (mode === 'true') {
      localStorage.setItem('isDarkMode', false)
    } else {
      localStorage.setItem('isDarkMode', true)
    }
  }

  useEffect(() => {
    setDarkMode()
  }, [])

  const setDarkMode = () => {
    const mode = localStorage.getItem('isDarkMode')
    if (mode === 'true') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }

  function returnToCountryList() {
    toggleShowCountryList(true)
  }

  return (
    <div id={theme} data-theme={theme} className="page">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="content-wrapper">
        {showCountryList && (
          <CountryList
            setCountryName={setCountryName}
            toggleShowCountryList={toggleShowCountryList}
          />
        )}

        {!showCountryList && (
          <Country
            setCountryName={setCountryName}
            countryName={countryName}
            returnToCountryList={returnToCountryList}
          />
        )}
      </div>
    </div>
  )
}

export default App
