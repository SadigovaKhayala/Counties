import { useEffect, useState, useRef } from 'react'
import { Routes, Route, browserRouter, Link } from 'react-router-dom'

import useFetch from './useFetch'
import SelectedCounty from './SelectedCounty'

const Home = ({ countries }) => {
  return (
    <div className="countries">
      {countries &&
        countries.map((country) => {
          return (
            <Link to={`/${country.name.common}`}>
              <div className="country">
                <div className="flag-img">{country.flag}</div>
                <div>
                  <h2> {country.name.common}</h2>
                  <p> Population: {country.population}</p>
                  <p> Region :{country.region}</p>
                  <p> Capital: {country.capital}</p>
                </div>
              </div>
            </Link>
          )
        })}
    </div>
  )
}

export default Home
