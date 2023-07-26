import { useState } from 'react';
import './App.css';

const App = () => {
  const [name1, setName1] = useState('');
  const [height1, setHeight1] = useState('');
  const [weight1, setWeight1] = useState('');
  const [reach1, setReach1] = useState('');
  const [winPercentages1, setWinPercentages1] = useState({});
  const [errorMessage1, setErrorMessage1] = useState('');

  const [name2, setName2] = useState('');
  const [height2, setHeight2] = useState('');
  const [weight2, setWeight2] = useState('');
  const [reach2, setReach2] = useState('');
  const [winPercentages2, setWinPercentages2] = useState({});
  const [errorMessage2, setErrorMessage2] = useState('');

  const handlePrediction1 = async () => {
    if (!height1 && !weight1 && !reach1) {
      setErrorMessage1('Please enter at least one value (Height, Weight, or Reach) for Fighter 1.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/predict_win_percentage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: parseFloat(height1),
          weight: parseFloat(weight1),
          reach: parseFloat(reach1),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWinPercentages1(data);
      setErrorMessage1('');
    } catch (error) {
      console.error('Prediction Error for Fighter 1:', error);
    }
  };


  const handlePrediction2 = async () => {
    if (!height2 && !weight2 && !reach2) {
      setErrorMessage2('Please enter at least one value (Height, Weight, or Reach) for Fighter 2.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/predict_win_percentage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          height: parseFloat(height2),
          weight: parseFloat(weight2),
          reach: parseFloat(reach2),
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setWinPercentages2(data);
      setErrorMessage2('');
    } catch (error) {
      console.error('Prediction Error for Fighter 2:', error);
    }
  };

  const getAdvantage = (metric, value1, value2) => {
    if (value1 === value2) {
      return `Equal ${metric}`;
    } else if (value1 > value2) {
      return `${name1} has ${metric} Advantage`;
    } else {
      return `${name2} has ${metric} Advantage`;
    }
  };

  return (
    <div className={`App ${winPercentages1.height || winPercentages1.weight || winPercentages1.reach || winPercentages2.height || winPercentages2.weight || winPercentages2.reach ? 'dark-mode' : ''}`}>
      <div className="header">
        <h1>OCTAGON</h1>
        <div className='hero-logo'><img src='ufc1.png' alt='UFC Logo' width={400} /></div>
        <h1 className='odds'>ODDS</h1>
      </div>

      <div className="cards">
        <div className="card">
          <div className='inputs'>
          <div className='label'>
              <label>Enter name for Fighter 1</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name1}
                onChange={(e) => setName1(e.target.value)}
              />
            </div>
            <div className='label'>
              <label>Enter Height for Fighter 1 (in cm)</label>
              <input
                type="text"
                placeholder="Enter Height"
                value={height1}
                onChange={(e) => setHeight1(e.target.value)}
              />
            </div>
            <div className='label'>
              <label>Enter Weight for Fighter 1 (in lbs.)</label>
              <input
                type="text"
                placeholder="Enter Weight"
                value={weight1}
                onChange={(e) => setWeight1(e.target.value)}
              />
            </div>
            <div className='label'>
              <label>Enter Reach for Fighter 1 (in inches)</label>
              <input
                type="text"
                placeholder="Enter Reach"
                value={reach1}
                onChange={(e) => setReach1(e.target.value)}
              />
            </div>
          </div>
          <div className='btn'>
            <button onClick={handlePrediction1}>Predict Win Percentage</button>
          </div>
          {errorMessage1 && <div className='error-message'>{errorMessage1}</div>}
          {Object.keys(winPercentages1).length > 0 && (
            <table className='prediction-table'>
              <tbody>
                <tr>
                  <th>Predicted Win Percentage for Height:</th>
                  <td><div>{winPercentages1.height.toFixed(2)}%</div></td>
                </tr>
                <tr>
                  <th>Predicted Win Percentage for Weight:</th>
                  <td><div>{winPercentages1.weight.toFixed(2)}%</div></td>
                </tr>
                <tr>
                  <th>Predicted Win Percentage for Reach:</th>
                  <td><div>{winPercentages1.reach.toFixed(2)}%</div></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <div className='inputs'>
          <div className='label'>
              <label>Enter name for Fighter 2</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name2}
                onChange={(e) => setName2(e.target.value)}
              />
            </div>
            <div className='label'>
              <label>Enter Height for Fighter 2 (in cm)</label>
              <input
                type="text"
                placeholder="Enter Height"
                value={height2}
                onChange={(e) => setHeight2(e.target.value)}
              />
            </div>
            <div className='label'>
              <label>Enter Weight for Fighter 2 (in lbs.)</label>
              <input
                type="text"
                placeholder="Enter Weight"
                value={weight2}
                onChange={(e) => setWeight2(e.target.value)}
              />
            </div>
            <div className='label'>
              <label>Enter Reach for Fighter 2 (in inches)</label>
              <input
                type="text"
                placeholder="Enter Reach"
                value={reach2}
                onChange={(e) => setReach2(e.target.value)}
              />
            </div>
          </div>
          <div className='btn'>
            <button onClick={handlePrediction2}>Predict Win Percentage</button>
          </div>
          {errorMessage2 && <div className='error-message'>{errorMessage2}</div>}
          {Object.keys(winPercentages2).length > 0 && (
            <table className='prediction-table'>
              <tbody>
                <tr>
                  <th>Predicted Win Percentage for Height:</th>
                  <td><div>{winPercentages2.height.toFixed(2)}%</div></td>
                </tr>
                <tr>
                  <th>Predicted Win Percentage for Weight:</th>
                  <td><div>{winPercentages2.weight.toFixed(2)}%</div></td>
                </tr>
                <tr>
                  <th>Predicted Win Percentage for Reach:</th>
                  <td><div>{winPercentages2.reach.toFixed(2)}%</div></td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>

      {Object.keys(winPercentages1).length > 0 && Object.keys(winPercentages2).length > 0 && (
        <div className='comparison'>
          <h2>Comparison:</h2>
          <div>{getAdvantage('Height', parseFloat(winPercentages1.height), parseFloat(winPercentages2.height))}</div>
          <div>{getAdvantage('Weight', parseFloat(winPercentages1.weight), parseFloat(winPercentages2.weight))}</div>
          <div>{getAdvantage('Reach', parseFloat(winPercentages1.reach), parseFloat(winPercentages2.reach))}</div>
          {winPercentages1.height + winPercentages1.weight + winPercentages1.reach >
            winPercentages2.height + winPercentages2.weight + winPercentages2.reach ? (
            <h3>{name1} is likely to win!</h3>
          ) : (
            <h3>{name2} is likely to win!</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
