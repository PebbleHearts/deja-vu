import React, { useState, useEffect } from 'react';
import './App.css';
import Counter from './components/counter';

const pattern = [1, 2, 5, 3, 2, 2, 4, 2, 5, 5, 4, 3, 1, 3, 3, 5, 1, 4, 3, 2, 1, 1, 4, 4, 1, 3, 1, 5, 3, 3];

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(Math.floor(Math.random() * pattern.length));
  const [rightAswerCount, setRightAswerCount] = useState(0);
  const [wrongAswerCount, setWrongAswerCount] = useState(0);
  const [totalAnswerCount, setTotalAnswerCount] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    setTotalAnswerCount(rightAswerCount + (wrongAswerCount * -1))
  }, [rightAswerCount, wrongAswerCount]);

  const wrongClick = () => {
    if (pattern[currentPatternIndex] !== pattern[currentPatternIndex -1]) {
      setRightAswerCount(rightAswerCount + 1);
    } else {
      setWrongAswerCount(wrongAswerCount + 1);
    }
    changeImage();
  };

  const rightClick = () => {
    if (pattern[currentPatternIndex] === pattern[currentPatternIndex -1]) {
      setRightAswerCount(rightAswerCount + 1);
    } else {
      setWrongAswerCount(wrongAswerCount + 1);
    }
    changeImage();
  };

  const changeImage = () => {
    setImageLoading(true);
    if (currentPatternIndex + 1 >= pattern.length) {
      setCurrentPatternIndex(Math.floor(Math.random() * pattern.length));
    } else {
      setCurrentPatternIndex(currentPatternIndex + 1);
    }
    setTimeout(() => {
      setImageLoading(false);
    }, 60);
  };

  const handleGameEnding = () => {
    setGameEnded(true);
  };

  const refreshPage = () => {
    window.location.reload(false);
  }

  return (
    <div className="appContainer">
      <div className="container">
        <div className="primaryBar">
          Game
        </div>
        <div className="secondaryBar">
          <div className="secondayBarCol">
            <div>Score</div>
            <div>{totalAnswerCount}</div>
          </div>
          <div className="secondayBarCol">
            <div>Right</div>
            <div>{rightAswerCount}</div>
          </div>
          <div className="secondayBarCol">
            <div>Wrong</div>
            <div>{wrongAswerCount}</div>
          </div>
        </div>
        <div className="counterContainer">
          <Counter
            mins={1}
            secs={0}
            startCounter={gameStarted}
            setGameStarted={setGameStarted}
            handleGameEnding={handleGameEnding}
          />
        </div>
        <div className="gameContainer">
          <div className="imageContainer">
            {
              !imageLoading ? (
                <div className="imageWrapper" style={{ marginLeft: `${(pattern[currentPatternIndex] - 1) * -300}px` }}>
                  <div className="singleImageDiv">
                    <img src={`images/1.png`} alt="squareImage"/>
                  </div>
                  <div className="singleImageDiv">
                    <img src={`images/2.png`} alt="squareImage"/>
                  </div>
                  <div className="singleImageDiv">
                    <img src={`images/3.png`} alt="squareImage"/>
                  </div>
                  <div className="singleImageDiv">
                    <img src={`images/4.png`} alt="squareImage"/>
                  </div>
                  <div className="singleImageDiv">
                    <img src={`images/5.png`} alt="squareImage"/>
                  </div>
                </div>
              ) : (
                <div className="imageCover"></div>
              )
            }
          </div>
          {
            gameStarted ? (
            <div className="buttonsContainer">
              <button
                className="button wrongButton"
                onClick={() => { wrongClick(); }}
              >
                <span>Different</span>
              </button>
              <button
                className="button rightButton"
                onClick={() => { rightClick(); }}
              >
                <span>Same</span>
              </button>
            </div>
            ) : (
            <div className="buttonsContainer">
              <button
                className="button startButton"
                onClick={() => { setGameStarted(true); changeImage() }}
              >
                Start Game
              </button>
            </div>
            )
          }
        </div>
        {
          gameEnded && (
            <div className="popupContainer">
              <div className="popupContentWrapper">
                <div className="resultScore">
                  <div className="resultScoreHeading">Score</div>
                    <div className="resultScoreValue">{totalAnswerCount}</div>
                </div>
                <div className="playAgainContainer">
                  <button onClick={() => { console.log('play again'); refreshPage(); }}>Play Again</button>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
