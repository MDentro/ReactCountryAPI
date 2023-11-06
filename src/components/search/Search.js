import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './Search.css'

const Search = ({ setCountryName, toggleShowCountryList }) => {
  const [searchInput, setSearchInput] = useState()

  function keyPressCheck(e) {
    if (e.keyCode === 13) {
      handleSearchForm(e)
    }
  }

  function handleSearchForm(e) {
    e.preventDefault()
    setCountryName(searchInput)
    toggleShowCountryList(false)
    e.target.value = ''
  }

  return (
    <div className="search-wrapper">
      <FontAwesomeIcon icon={faMagnifyingGlass} className="maginfyingGlass" />
      <form onSubmit={handleSearchForm}>
        <input
          placeholder="Search for a country"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={keyPressCheck}></input>
      </form>
    </div>
  )
}

export default Search
