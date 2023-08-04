
// Generate random number for use in getComputerChoice function
function getRandomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};


// Choose rock,paper or scissors randomly for computer
function getComputerChoice() {
    let randomNumber = getRandomNumber(1, 3);
    let comChoice;

    if (randomNumber == 1) {
        comChoice = "rock";
    }
    else if (randomNumber == 2) {
        comChoice = "paper";
    }
    else if (randomNumber == 3) {
        comChoice = "scissors";
    }
    else {
        return "Random Number Generation is not as expected"
    }
    return comChoice;
};


// Function defining a single round game of rock, paper, scissors
function playGame (playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase().trim();
    let message;
    let winner;
    
    if (playerSelection === computerSelection) {
        message = `Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +
        `It's a tie.`;   
    }
    else if (playerSelection === "rock" && computerSelection === "paper") {
        winner = "computer";
        message = `Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +
        `You've lost. Paper beats rock.`;   
    }
    else if (playerSelection === "rock" && computerSelection === "scissors") {
        winner = "player";
        message = `Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +                
        `You've won! Rock beats scissors.`;    
    }
    else if (playerSelection === "paper" && computerSelection === "rock") {
        winner = "player";
        message = `Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +
        `You've won! Paper beats rock.`;    
    }
    else if (playerSelection === "paper" && computerSelection === "scissors") {
        winner = "computer";
        message = `Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +
        `You've lost. Scissors beats paper.`;    
    }
    else if (playerSelection === "scissors" && computerSelection === "rock") {
        winner = "computer";
        message =`Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +
        `You've lost. Rock beats scissors.`;    
    }
    else if (playerSelection === "scissors" && computerSelection === "paper") {
        winner = "player";
        message =`Computer's choice: ${computerSelection}\n` +
        `Your choice: ${playerSelection}\n` +
        `You've won! Scissors beats paper.`;     
    }
    else {
        message = "Some type of error occurred."; 
    }

    const result = {
        message,
        winner
    };

    return result;
};



const message = document.querySelector("#message");
const buttons = document.querySelectorAll("button");
const pScore = document.querySelector("#p-score");
const cScore = document.querySelector("#c-score");
const playAgain = document.querySelector("#play-again");

// Play one round. Display message and current score on screen
function playAndDisplay (event) {
    let result = ( playGame( event.target.id, getComputerChoice() ) );

        if (result.winner == "player" ) {
            pScore.textContent = +pScore.textContent + 1;
            message.textContent = result.message
            
        }
        else if (result.winner == "computer" ) {
            cScore.textContent = +cScore.textContent +1;
            message.textContent = result.message;
        }

        else { message.textContent = result.message};
};


buttons.forEach( button => button.addEventListener("click", playAndDisplay));


// Observe change to player score, if it's 5 display win
const observerP = new MutationObserver( mutations => 
    mutations.forEach( record => {
        if (record.target.innerText == 5) {
            message.textContent = "Congratulations. You've won the game.";
            buttons.forEach( button => button.removeEventListener("click", playAndDisplay));
            const newElement = document.createElement("button");
            newElement.textContent = "Play again";
            playAgain.appendChild(newElement);

        }
    })
);

let configP = { characterData: false, attributes: false, childList: true, subtree: false };
observerP.observe(pScore, configP);

// Observe change to computer score, if it's 5 display lose
const observerC = new MutationObserver( mutations => 
    mutations.forEach( record => {
        if (record.target.innerText == 5) {
            message.textContent = "You've lost the game. Better luck next time.";
            buttons.forEach( button => button.removeEventListener("click", playAndDisplay));
            const newElement = document.createElement("button");
            newElement.textContent = "Play again";
            playAgain.appendChild(newElement);
        }
    })
);

let configC = { characterData: false, attributes: false, childList: true, subtree: false };
observerC.observe(cScore, configC);

// Reload page
playAgain.addEventListener("click", event =>
    location.reload());



