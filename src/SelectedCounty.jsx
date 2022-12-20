import { common } from '@mui/material/colors'
import { useEffect, useState, useRef } from 'react'
import { Routes, Route, browserRouter, Link, useParams } from 'react-router-dom'
import DarkMood from './design/moon-solid.svg'
import useFetch from './useFetch'

const SelectedCounty = ({ a }) => {
  const name = useParams()

  const [countries, setCountries] = useState([])
  const [api, setApi] = useState(
    `https://restcountries.com/v3.1/name/${name.name}`,
  )

  console.log(api)

  let getCurrencies = () => {
    for (var propName in countries[0]?.currencies) {
      if (countries[0]?.currencies?.hasOwnProperty(propName)) {
        var propValue = countries[0]?.currencies[propName]
        return propValue.name
      }
    }
  }
  let getNativeName = () => {
    for (var propName in countries[0]?.name?.nativeName) {
      if (countries[0]?.name?.nativeName.hasOwnProperty(propName)) {
        var propValue = countries[0]?.name?.nativeName[propName]
        return propValue.common
      }
    }
  }

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
    <div className="content">
      <div id="selectedCountry-navbar" className="navbar ">
        <h3>Where in the world?</h3>
        <div id="darkmood">
          {<img className="moonIcon" src={DarkMood} alt="" srcset="" />}
          <p>Dark Mood</p>
        </div>
      </div>
      <div className="innerContent">
        <Link to={'/'}>
          <div className="goHompage">
            {' '}
            <button id="goHompage">← Back</button>
          </div>
        </Link>
        <Link to={`/${countries[0]?.name?.common}`}>
          <div id="selectedCounty">
            <div className="one-flag">
              <img src={countries[0]?.flags.png} />
            </div>
            <div className="aboutCountry">
              <h2> {countries[0]?.name?.common}</h2>
              <div className="parentDivofInfo">
                <div className="childDiv">
                  <p> Native Name:</p> <p>{getNativeName()}</p>
                </div>
                <div className="childDiv">
                  <p> Population: </p> <p>{countries[0]?.population}</p>
                </div>
                <div className="childDiv">
                  <p> Region :</p> <p>{countries[0]?.region}</p>
                </div>
                <div className="childDiv">
                  <p>Sub Region :</p> <p>{countries[0]?.subregion}</p>
                </div>
                <div className="childDiv">
                  <p> Capital:</p> <p> {countries[0]?.capital}</p>
                </div>
                <div className="childDiv">
                  <p> Top Level Domain: </p> <p>{countries[0]?.tld}</p>
                </div>
                <div className="childDiv">
                  <p>Currencies:</p> <p>{getCurrencies()}</p>
                </div>
                <div className="langs">
                  <div> Languages:</div>
                  <div className="childDivv">
                    {countries[0]?.languages &&
                      Object.values(countries[0]?.languages).map((el) => {
                        return <p>{el}</p>
                      })}
                  </div>
                </div>
              </div>

              <div className="countryBorders">
                <div className="borderHeader">Border Counties :</div>

                <div className="borderCount">
                  {countries[0]?.borders?.map((border) => {
                    return (
                      <div className="brdrCnt">
                        <Link
                          to={`/${border}`}
                          onClick={() =>
                            setApi(
                              `https://restcountries.com/v3.1/alpha/${border}`,
                            )
                          }
                        >
                          {border}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default SelectedCounty
