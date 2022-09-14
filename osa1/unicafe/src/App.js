import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if ((good + neutral + bad) > 0) {
    const valueObject = {
      good: good,
      neutral: neutral,
      bad: bad
    }
    return (
      <>
        <StatisticLine text='good' value={valueObject} />
        <StatisticLine text='neutral' value={valueObject} />
        <StatisticLine text='bad' value={valueObject} />
        <StatisticLine text='all' value={valueObject} />
        <StatisticLine text='average' value={valueObject} />
        <StatisticLine text='positive' value={valueObject} />
      </>
    )
  }
  return <p>No feedback given</p>
}

const StatisticLine = ({ text, value }) => {
  let valueToShow // Store the value to show in this variable based on the component text

  // Store the object variables for ease of access
  const good = value.good
  const neutral = value.neutral
  const bad = value.bad

  switch (text) {
    case 'good':
      valueToShow = good
      break
    case 'neutral':
      valueToShow = neutral
      break
    case 'bad':
      valueToShow = bad
      break
    case 'all':
      valueToShow = good + neutral + bad
      break
    case 'average':
      valueToShow = (good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)
      break
    case 'positive':
      const sum = good + neutral + bad
      const percentage = (good / (sum)) * 100
      valueToShow = percentage + ' %'
      break
    default:
      valueToShow = "<- Not a known stat type"
  }
  return <p>{text} {valueToShow}</p>
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App