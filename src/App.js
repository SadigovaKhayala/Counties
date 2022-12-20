import { render } from '@testing-library/react'
import { assign } from 'lodash'
import { useEffect, useState, useRef } from 'react'
import { Routes, Route, browserRouter, Link } from 'react-router-dom'
import Home from './Home'
import SelectedCounty from './SelectedCounty'
import { style } from './App.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [api, setApi] = useState(`https://restcountries.com/v3.1/all`)

  //render element to screen

  async function Render(api) {
    try {
      const res = await fetch(api)

      const data = await res.json()
      await setCountries(data)
    } catch {
      console.log('error')
    }
  }

  useEffect(() => {
    Render(api)
    console.log(countries)
  }, [api])
  console.log(api)

  // search

  const refContainer = useRef()

  // one country

  console.log(countries)

  return (
    <div className="container ">
      {/* <div className="blokElement">
        <div className="searchBar">
          <input
            ref={refContainer}
            type="text"
            className="inputSearch"
            placeholder="search here..."
            onChange={() => console.log(refContainer.current.value)}
          />
        </div>
        <button
          onClick={() => {
            setApi(
              `https://restcountries.com/v3.1/name/${refContainer.current.value}`,
            )
          }}
        >
          click
        </button>
        <select
          onChange={(val) => {
            if (val.target.value == 'all') {
              setApi(`https://restcountries.com/v3.1/all`)
            } else {
              setApi(
                `https://restcountries.com/v3.1/region/${val.target.value}`,
              )
            }
          }}
        >
          <option value="all">Filter by Region</option>
          <option value="africa">Africa</option>
          <option value="america">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>

        <Link to="/index">About</Link>
      </div> */}

      <Routes>
        <Route
          path=""
          element={
            <Home
              refContainer={refContainer}
              setApi={setApi}
              countries={countries}
            />
          }
        />
        <Route path="/:name" element={<SelectedCounty />} />
      </Routes>
    </div>
  )
}

export default App
