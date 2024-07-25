import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({countryData, countries, onSelectCountry}) => {

  if(countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
  } else if (countries.length == 0) {
    return (
      <div>
      <p>Not found any countries</p>
    </div>
    )
  } else if (countryData) {
    let langs = Object.values(countryData.languages)
      return (
        <div>
          <h1>{countryData.name.common}</h1>
          <p>capital {countryData.capital}</p>
          <p>area {countryData.area}</p>
          <br />
          <h2>languages:</h2>
          <ul>
          {Object.values(countryData.languages).map(lan => 
            <Language key={lan} lan={lan} />
          )}
          </ul><div className="images">
          <img src={countryData.flags.png} alt="" width="300" height="200"></img></div>
        </div>
      )


  } else if (countries.length > 1 && countries.length <= 10) {
    return(
      <ul>
        {countries.map((con) =>
        <div key={con}>
          <li key={con}>{con}{'   '} 
            <button key={con} onClick={() => onSelectCountry(con)}>show</button>
          </li>
        </div> 
        
        )}
      </ul>
    )
  } else {
    return <p>Ladataan dataa...</p>
  }

}



const Language = ({lan}) => {
  return(
    <li>
      {lan}
    </li>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searched, setSearch] = useState([])
  const [country, setCountry] = useState(null)
  const [countryData, setCountryData] = useState(null)
  

  //Haetaan kaikki maat aluksi
  useEffect(() => {
    if (countries.length === 0) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then((response) => {
          const names = Object.values(response.data)
          const cr = names.map((coun) => coun.name.common)
          setCountries(cr)
          setSearch(cr)
        })
        .catch((error) => console.log("Datan haku päättyy virheeseen"))
    }
  }, []);

  useEffect(() => {
    if (country) {
      
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country.toLowerCase()}`)
        .then(response => {
          setCountryData(response.data)
        })
        .catch(error => {
          console.error("Virhe haettaessa dataa:", error)
        })
    }
  }, [country])


  const handleChange = (event) => {
    event.preventDefault()
    const searchValue = event.target.value.toLowerCase()
    const filteredCountries = countries.filter((value) =>
      value.toLowerCase().includes(searchValue)
    )
    setSearch(filteredCountries);
    if (filteredCountries.length === 1) {
      setCountry(filteredCountries[0])
    } else {
      setCountry(null)
      setCountryData(null)
    }
  }
  const handleSelectCountry = (selectedCountry) => {
    setCountry(selectedCountry);
  }

  return (
    <div>
      <form>
        find countries: <input onChange={handleChange} />
      </form>           
      <Country countryData={countryData} countries={searched} onSelectCountry={handleSelectCountry}/>
    </div>
  )

}

export default App
