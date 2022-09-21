import { useState } from 'react'

const Person = ({ person }) => {
  return <li>{person.name} {person.number}</li>
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  /* 
  ** Note that we assume that each person in the phonebook has
  ** first name and a surname separated by a space, so the initial filter
  ** term '' is valid.
  */
  const [filterTerm, setFilterTerm] = useState('')

  const addNewName = (event) => {
    // Prevent site from reloading in any case
    event.preventDefault()

    // Check whether the name arleady is in the phonebook
    const nameAlreadyInList = persons.find(
      person => person.name === newName)

    if (nameAlreadyInList) {
      alert(`${newName} is already added to the phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
    }

  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterTermChange = (event) => {
    console.log(event.target.value)
    setFilterTerm(event.target.value)
  }

  const personsToShow = persons.filter(person => {
    const pNameLower = person.name.toLowerCase()
    const fTermLower = filterTerm.toLowerCase()
    return pNameLower.includes(fTermLower)
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input
          value={filterTerm}
          onChange={handleFilterTermChange}
        />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addNewName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.name} person={person} />)}
      </ul>
    </div>
  )

}

export default App