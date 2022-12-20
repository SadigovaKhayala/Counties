import { useEffect, useState, useRef } from 'react'
import { Routes, Route, browserRouter, Link } from 'react-router-dom'
import DarkMood from './design/moon-solid.svg'
import SearchIcon from './design/magnifying-glass-solid.svg'

import SelectedCounty from './SelectedCounty'

const Home = ({ countries, refContainer, setApi }) => {
  return (
    <div className="homeContainer">
      <div className="navbar">
        <h3>Where in the world?</h3>
        <div id="darkmood">
          {<img className="moonIcon" src={DarkMood} alt="" srcset="" />}
          <p>Dark Mood</p>
        </div>
      </div>

      <div className="filter">
        <div className="searchBar">
          <form
            className="searchForm"
            onSubmit={(e) => {
              e.preventDefault()
              refContainer.current.value != ''
                ? setApi(
                    `https://restcountries.com/v3.1/name/${refContainer.current.value}`,
                  )
                : setApi(`https://restcountries.com/v3.1/all`)
            }}
          >
            <button className="submitBtn">
              <img id="searchIcon" src={SearchIcon} alt="" srcset="" />
            </button>
            <input
              ref={refContainer}
              type="text"
              className="inputSearch"
              placeholder="Search for a country"
            />
          </form>
        </div>

        <select
          className="selectBox"
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
      </div>

      <div className="countries">
        {countries &&
          countries.map((country) => {
            return (
              <Link to={`/${country.name.common}`}>
                <div className="country">
                  <div className="flag-img">
                    <img src={country.flags.png} />
                  </div>
                  <div className="countries-content">
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
    </div>
  )
}

export default Home
