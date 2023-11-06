import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './LoadingSpinner.css'

const LoadingSpinner = () => {
  return <FontAwesomeIcon className="loading" icon={faSpinner} />
}

export default LoadingSpinner
