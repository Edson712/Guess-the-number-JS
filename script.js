document.addEventListener("DOMContentLoaded", function () {
    let randomNumber;
    let attempts = 0;
    let gameEnded = false;
    let maxAttempts;

    const guessButton = document.getElementById("guessBtn");
    const resetButton = document.getElementById("resetBtn");
    const resultMessage = document.getElementById("result");

    const easyButton = document.getElementById("easy");
    const normalButton = document.getElementById("normal");
    const hardButton = document.getElementById("hard");
    const guessInput = document.getElementById("guess");

    function startGame() {
        const selectedLevel = document.querySelector('.selected-level');
        if (selectedLevel === easyButton) {
            maxAttempts = Infinity; // Unlimited attempts
        } else if (selectedLevel === normalButton) {
            maxAttempts = 10; // 10 attempts
        } else {
            maxAttempts = 5; // 5 attempts
        }

        randomNumber = Math.floor(Math.random() * 100) + 1;
        attempts = 0;
        gameEnded = false;
        resultMessage.textContent = "";
        guessButton.disabled = false;
        guessInput.value = ""; // Clear the guess input
    }

    startGame();

    easyButton.addEventListener("click", function () {
        easyButton.classList.add("selected-level");
        normalButton.classList.remove("selected-level");
        hardButton.classList.remove("selected-level");
        resetButton.disabled = false;
        startGame();
    });

    normalButton.addEventListener("click", function () {
        normalButton.classList.add("selected-level");
        easyButton.classList.remove("selected-level");
        hardButton.classList.remove("selected-level");
        resetButton.disabled = false;
        startGame();
    });

    hardButton.addEventListener("click", function () {
        hardButton.classList.add("selected-level");
        easyButton.classList.remove("selected-level");
        normalButton.classList.remove("selected-level");
        resetButton.disabled = false;
        startGame();
    });

    guessButton.addEventListener("click", function () {
        if (gameEnded) return;
    
        const userGuess = parseInt(document.getElementById("guess").value);
        attempts++;
        resultMessage.style.color = 'black'
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            resultMessage.textContent = "Please enter a valid number between 1 and 100.";
        } else if (userGuess === randomNumber) {
            resultMessage.textContent = `Congratulations! You guessed the number ${randomNumber} in ${attempts} attempts.`;
            resultMessage.style.color = 'green'
            guessButton.disabled = true;
            gameEnded = true;
        } else if (userGuess < randomNumber) {
            resultMessage.textContent = `Attempt ${attempts}: The number is higher.`;
        } else {
            resultMessage.textContent = `Attempt ${attempts}: The number is lower.`;
        }
    
        if (!gameEnded && attempts >= maxAttempts) {
            resultMessage.textContent = `You've exhausted your ${maxAttempts} attempts! The number was ${randomNumber}.`;
            resultMessage.style.color = 'red'
            guessButton.disabled = true;
            gameEnded = true;
        }
    });

    resetButton.addEventListener("click", function () {
        startGame();
    });
});
