import { useState } from 'react';
import GuessLine from './GuessLine';
import FeedBack from './FeedBack';

const GameBoard = () => {
  const arrayOfMoves = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [guesses, setGuesses] = useState(Array.from({ length: 10 }, () => [0, 0, 0, 0]));
  const [feedbacks, setFeedbacks] = useState(Array.from({ length: 10 }, () => ['x', 'x', 'x', 'x']));
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

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
      if (feedback.every((color) => color === 'c')) {
        setIsGameOver(true);
        setIsGameWon(true);
      }
    }
    if (currentGuessIndex < 9 && !isGameWon) {
      setCurrentGuessIndex(currentGuessIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const calculateFeedback = (guess) => {
    //1=red ,2 = yellow ,3 = blue ,4= green, 5 = orange, 6 = violet
    const secret = [1, 2, 3, 4];
    let feedback = [];

    let guessCopy = [...guess];
    let secretCopy = [...secret];

    // Check for exact matches
    for (let i = 0; i < guess.length; i++) {
      if (guessCopy[i] === secretCopy[i]) {
        feedback.push('c');
        guessCopy[i] = null;
        secretCopy[i] = null;
      }
    }

    // Check if it exists in wrong place and removing from guess after checking so that , repetetive elements are not considered
    for (let i = 0; i < guess.length; i++) {
      if (guessCopy[i] === null) {
        continue;
      }

      let secretIndex = secretCopy.indexOf(guessCopy[i]);
      if (secretIndex !== -1) {
        feedback.push('u');
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
        {isGameWon && <p>Congratulations! You won the game.</p>}
      {isGameOver && !isGameWon && <p>You lost the game.</p>}
      {arrayOfMoves.map((item, index) => {
        const isGuessLineDisabled = index < currentGuessIndex || isGameWon;
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
     
    </div>
  );
}  
export default GameBoard;