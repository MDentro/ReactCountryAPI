import React, { useState } from 'react'
import './DropDown.css'

const DropDown = ({ selected, setSelected, setKeyword }) => {
  const options = [
    { label: 'Filter by region', value: 'All' },
    { label: 'Africa', value: 'Africa' },
    { label: 'Americas', value: 'Americas' },
    { label: 'Asia', value: 'Asia' },
    { label: 'Europe', value: 'Europe' },
    { label: 'Oceania', value: 'Oceania' },
  ]
  const [activeSelected, setActiveSelected] = useState(false)

  const toggle = () => setActiveSelected((prevState) => !prevState)

  const handleItemClick = (item) => {
    filterCountries(item.value)
    setSelected(item.label)
    toggle()
  }

  function filterCountries(region) {
    setKeyword(region)
  }

  return (
    <div className="selection-toggle-container">
      <div
        className="custom-select"
        onMouseEnter={() => setActiveSelected(true)}
        onMouseLeave={() => setActiveSelected(false)}
        onClick={() => setActiveSelected(!activeSelected)}>
        <div
          className={`select-selected ${
            activeSelected ? 'select-arrow-active' : ''
          }`}>
          {selected}
        </div>
        <div className="select-items">
          {activeSelected &&
            options.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => handleItemClick(item)}
                  className={`${
                    item.label === selected ? 'same-as-selected' : ''
                  }`}>
                  {item.label}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default DropDown
