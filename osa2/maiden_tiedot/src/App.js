import { useState, useEffect } from 'react'
import axios from 'axios'

import Countries from './components/Countries'

const App = () => {

  const [countries, setCountries] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  const countriesToShow = countries.filter(country => {
    const countryNameLower = country.name.common.toLowerCase()
    const fTermLower = countryFilter.toLowerCase()
    return countryNameLower.includes(fTermLower)
  })

  return (
    <div>
      <form>
        find countries
        <input
          value={countryFilter}
          onChange={handleFilterChange}
        />
      </form>
      <Countries countriesToShow={countriesToShow} setCountryFilter={setCountryFilter} />
    </div>
  )
}

export default App