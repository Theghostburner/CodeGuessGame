import { useState } from 'react';
import GuessLine from './GuessLine';
import FeedBack from './FeedBack';

const GameBoard = () => {
  const arrayOfMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [guesses, setGuesses] = useState(Array.from({ length: 10 }, () => [0, 0, 0, 0]));
  const [feedbacks, setFeedbacks] = useState(Array.from({ length: 10 }, () => ['x', 'x', 'x', 'x']));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const onButtonClick = (index, buttonIndex) => {
    if (currentGuessIndex === index) {
      const newGuesses = [...guesses];
      newGuesses[index][buttonIndex] = (newGuesses[index][buttonIndex] % 6) + 1;
      setGuesses(newGuesses);
    }
  };

  const onSubmitGuess = (index) => {
    if (currentGuessIndex === index) {
      const feedback = calculateFeedback(guesses[index]);
      setFeedbacks((prevFeedbacks) => {
        const newFeedbacks = [...prevFeedbacks];
        newFeedbacks[index] = feedback;
        return newFeedbacks;
      });
    }
    if (currentGuessIndex < 9) {
      setCurrentGuessIndex(currentGuessIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const calculateFeedback = (guess) => {
    const secret = [1, 2, 3, 4];
    let feedback = [];
  
    let guessCopy = [...guess];
    let secretCopy = [...secret];
  
    // Check for exact matches
    for (let i = 0; i < guess.length; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        feedback.push('black');
        guessCopy[i] = null;
        secretCopy[i] = null;
      }
    }
  
    // Check for number matches
    for (let i = 0; i < guess.length; i++) {
      if (guessCopy[i] === null) {
        continue;
      }
  
      let secretIndex = secretCopy.indexOf(guessCopy[i]);
      if (secretIndex !== -1) {
        feedback.push('white');
        guessCopy[i] = null;
        secretCopy[secretIndex] = null;
      }
    }
  
    // Fill remaining feedback with x's
    while (feedback.length < 4) {
      feedback.push('x');
    }
  
    return feedback;
  };
  
  

  return (
    <div>
      {arrayOfMoves.map((item, index) => {
        const isGuessLineDisabled = index < currentGuessIndex;
        const isSubmitDisabled = isGuessLineDisabled || isGameOver;

        return (
          <div key={item} className="guessLineContainer">
            <GuessLine
              numberArray={guesses[index]}
              onButtonClick={(buttonIndex) => onButtonClick(index, buttonIndex)}
              key={item}
              disabled={isGuessLineDisabled}
            />
            <button
              className="submitGuess"
              onClick={() => onSubmitGuess(index)}
              disabled={isSubmitDisabled}
            >
              Submit Guess
            </button>
            {isGuessLineDisabled && (
              <div className="feedbackContainer">
                <FeedBack feedBackArray={feedbacks[index]} />
              </div>
            )}
          </div>
        );
      })}
      {isGameOver && <p>Congratulations! You won the game.</p>}
    </div>
  );
};

export default GameBoard;
