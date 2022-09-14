import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <div>
      <button onClick={handleClick}>{text}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(7).fill(0))

  console.log(votes)

  // TO-DO
  // Create function for onClick event that randomizes an anecdote
  const generateRandAnecdoteIndex = () => {
    const randAnecdoteIndex = Math.floor(Math.random() * anecdotes.length) // Looking for values from 0 to 6 for the index
    setSelected(randAnecdoteIndex)
  }

  const voteFunc = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
  }

  const returnMostPopularAnecdote = () => {
    const mostVotesAmount = Math.max(...votes)
    const indexOfMostVotesValue = votes.indexOf(mostVotesAmount)
    return anecdotes[indexOfMostVotesValue]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Button handleClick={generateRandAnecdoteIndex} text="next anecdote" />
      <Button handleClick={voteFunc} text="vote" />
      <h1>Anecdote with the most votes</h1>
      {returnMostPopularAnecdote()}
    </div>
  )
}

export default App