let userScore = 0;
let computerScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector('#msg');
const userScore1 = document.querySelector('#userScore');
const computerScore1 = document.querySelector('#computerScore');

const computerChoice = () => {
    const opt = ['rock', 'paper', 'scissor'];
    const random = Math.floor(Math.random() * 3);
    return opt[random];
}

const draw = () => {
    console.log("Game was Draw");
    msg.innerText = "Game was Draw!! Play Again!!"
    msg.style.backgroundColor = "#f4b41a"
}

const playGame = (userChoice) => {
    console.log("User Choice = ", userChoice);
    const comp = computerChoice();
    console.log("Computer Choice = ", comp);

    if (userChoice === comp) {
        draw();
    }
    else {
        let userWin = true;
        if (userChoice === 'rock') {
            userWin = comp === 'paper' ? false : true;
        }
        else if (userChoice == "paper") {
            userWin = comp === 'scissor' ? false : true;
        }
        else {
            userWin = comp === 'rock' ? false : true;
        }
        showWinner(userWin);
    }
}

const showWinner = (userWin) => {
    if (userWin) {
        userScore++;
        userScore1.innerText = userScore;
        console.log("You Win!")
        msg.innerText = "You Win!"
        msg.style.backgroundColor = "green";
    }
    else {
        computerScore++;
        computerScore1.innerText = computerScore;
        console.log("Computer Win!")
        msg.innerText = "You Loss!"
        msg.style.backgroundColor = 'red';
    }
}


choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id");
        // console.log("Choice was clicked", userChoice);
        playGame(userChoice)
    })
});