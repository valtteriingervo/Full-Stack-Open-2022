import { useState, useEffect } from 'react'

import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

import personService from './services/PersonsService'


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
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
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

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })

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

  const deletePerson = (id) => {
    console.log(id, 'id')
    const delPersonName = persons.find(person => person.id === id).name
    const confirmMsg = `Delete ${delPersonName} ?`

    if (!window.confirm(confirmMsg)) {
      console.log('The user decided to cancel the deletion')
    }
    else {
      personService
        .delPerson(id)
        .then(responseCode => {
          console.log(`deleted person ${delPersonName} with status code ${responseCode}`)
        })
        .then(() => {
          personService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
        })
    }
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

      <Persons
        personsToShow={personsToShow}
        deletePerson={deletePerson}
      />

    </div>
  )

}

export default App