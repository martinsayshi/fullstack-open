import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(2)}%</td>
      </tr>
    );
  } else if (text === "average") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value.toFixed(2)}</td>
      </tr>
    );
  }
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) return <p>No feedback given</p>;
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
    const updatedAll = all + 1;
    setAll(updatedAll);
    const updatedAverage = (updatedGood - bad) / updatedAll; // update the average state
    setAverage(updatedAverage);
    const updatedPositive = (updatedGood / updatedAll) * 100; // update the positive state
    setPositive(updatedPositive);
  };

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    const updatedAll = all + 1;
    setAll(updatedAll);
    const updatedAverage = (good - bad) / updatedAll; // update the average state
    setAverage(updatedAverage);
    const updatedPositive = (good / updatedAll) * 100; // update the positive state
    setPositive(updatedPositive);
  };

  const handleBadClick = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
    const updatedAll = all + 1;
    setAll(updatedAll);
    const updatedAverage = (good - updatedBad) / updatedAll; // update the average state
    setAverage(updatedAverage);
    const updatedPositive = (good / updatedAll) * 100; // update the positive state
    setPositive(updatedPositive);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
