import { useState, useEffect } from 'react'

import axios from 'axios'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  /* 
  ** Note that we assume that each person in the phonebook has
  ** first name and a surname separated by a space, so the initial filter
  ** term '' is valid.
  */
  const [filterTerm, setFilterTerm] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

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

      <Filter
        filterTerm={filterTerm}
        handleFilterTermChange={handleFilterTermChange}
      />

      <h3>add a new</h3>

      <PersonForm
        addNewName={addNewName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <Persons personsToShow={personsToShow} />

    </div>
  )

}

export default App