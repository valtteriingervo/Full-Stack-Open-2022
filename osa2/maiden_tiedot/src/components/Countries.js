const DetailedCountry = ({ country }) => {
    // Store the values of the language object
    const languages = Object.values(country.languages)

    return (
        <div>
            <h2>{country.name.common}</h2>
            <p>capital {country.capital[0]}</p>
            <p>area {country.area}</p>
            <h3>languages:</h3>
            <ul>
                {languages.map(language => {
                    return <li key={language + country.area}>{language}</li>
                })}
            </ul>
            <img src={country.flags.png} alt={country.name.common}></img>
        </div>
    )
}

const Country = ({ country, setCountryFilter }) => {
    const showDetailed = () => {
        setCountryFilter(country.name.common)
    }
    return (
        <li>
            {country.name.common}
            <button onClick={showDetailed}>show</button>
        </li>
    )
}

const Countries = ({ countriesToShow, setCountryFilter }) => {
    if (countriesToShow.length === 1) {
        return <DetailedCountry country={countriesToShow[0]} />
    }
    if (countriesToShow.length > 10) {
        const tooManyString = 'Too many matches, specify another filter'
        return <p>{tooManyString}</p>
    }
    return (
        <ul>
            {countriesToShow.map(country =>
                <Country key={country.name.common} country={country} setCountryFilter={setCountryFilter} />)}
        </ul>
    )
}

export default Countries