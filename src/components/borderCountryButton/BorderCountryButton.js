import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './BorderCountryButton.css'

const BorderCountryButton = ({ borderCountryCode, setCountry, data }) => {
  const [borderCountryName, setBorderCountryName] = useState('')

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://restcountries.com/v3.1/alpha/${borderCountryCode}`
        )
        if (data[0].name.common === 'Netherlands') {
          setBorderCountryName('The Netherlands')
        } else {
          setBorderCountryName(data[0].name.common)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://restcountries.com/v3.1/alpha/${borderCountryCode}`
        )
        if (data[0].name.common === 'Netherlands') {
          setBorderCountryName('The Netherlands')
        } else {
          setBorderCountryName(data[0].name.common)
        }
      } catch (e) {
        console.error(e)
      }
    }
    fetchData()
  }, [data])

  return (
    <button
      className="borderCountry-button"
      key={`${borderCountryCode}`}
      onClick={() => setCountry(borderCountryName)}>
      {borderCountryName}
    </button>
  )
}

export default BorderCountryButton
