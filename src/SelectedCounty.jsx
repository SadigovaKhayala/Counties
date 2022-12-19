import { useEffect, useState, useRef } from 'react'
import { Routes, Route, browserRouter, Link, useParams } from 'react-router-dom'

import useFetch from './useFetch'

const SelectedCounty = ({ a }) => {
  const name = useParams()

  const [countries, setCountries] = useState([])
  const [api, setApi] = useState(
    `https://restcountries.com/v3.1/name/${name.name}`,
  )
  console.log(api)

  //render element to screen

  async function Render(api) {
    const res = await fetch(api)
    const data = await res.json()
    await setCountries(data)
  }

  useEffect(() => {
    Render(api)
    console.log(countries)
  }, [api])

  return (
    <div>
      <Link to={`/${countries[0]?.name?.common}`}>
        <div className="country">
          <div className="flag-img">{countries[0]?.flag}</div>
          <div>
            <h2> {countries[0]?.name?.common}</h2>
            <p> Population: {countries[0]?.population}</p>
            <p> Region :{countries[0]?.region}</p>
            <p> Capital: {countries[0]?.capital}</p>
            <div>
              {countries[0]?.borders.map((border) => {
                return (
                  <Link
                    to={`/${border}`}
                    onClick={() =>
                      setApi(`https://restcountries.com/v3.1/alpha/${border}`)
                    }
                  >
                    <p>{border}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </Link>
      <Link to={'/'}>
        <button>homepage</button>
      </Link>
    </div>
  )
}

export default SelectedCounty
