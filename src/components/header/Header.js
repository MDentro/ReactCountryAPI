import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-regular-svg-icons'
import './Header.css'

const Header = ({ theme, toggleTheme }) => {
  return (
    <header>
      <p>Where in the world?</p>
      <div>
        {theme === 'light' ? (
          <div className="mode-container" onClick={toggleTheme}>
            <FontAwesomeIcon icon={faMoon} />
            <p>Dark Mode</p>
          </div>
        ) : (
          <div className="mode-container" onClick={toggleTheme}>
            <FontAwesomeIcon icon={faSun} />
            <p>Light Mode</p>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
