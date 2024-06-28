const scramblleWord = document.querySelector("#scramblle-word");
const tries = document.querySelector("#span-tries");
const triesSymbol = document.querySelector("p#tries");
const trySymbols = document.querySelectorAll(".circles")
const mistakes = document.querySelector("#span-mistakes");
const input = document.querySelectorAll("input");
const inputBoxes = document.querySelector(".word-letters");
const pScramble = document.querySelector(".scramblle");
const imgLogo = document.querySelector("#logo");
const form = document.querySelector("form");


const random = document.querySelector("#random");
const reset = document.querySelector("#reset");

let word = ""
let guessedLetters = [];
let triesLeft = 5;


const getWord = async function () {
    const response = await fetch (`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const data = await response.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    createScramblleWord(word);
    placeholders(word)
    scrambleTheWord(word);

}
console.log(getWord(word))

const scrambleTheWord = (word) => {
    const separateLetters = word.split("");
    const scrambledWord = separateLetters.sort(() => Math.random() - 0.5).join(' ');
    pScramble.textContent = scrambledWord;
}




function createScramblleWord(word) {
    scramblleWord.innerHTML = "";
    pScramble.textContent = word;
    scramblleWord.appendChild(pScramble)
    scramblleWord.classList.add("shake");   
    imgLogo.classList.add("shake");
}


function placeholders (word) {
    inputBoxes.innerHTML = "";
    const separateLetters = word.split("");
    for (let letter of separateLetters) {
        const inputBox = document.createElement("input");
        inputBox.type = "text";
        inputBox.classList.add("input");
        inputBox.maxLength = 1;
        inputBoxes.appendChild(inputBox);
    }
}

function checkLetter(event) {
    const input = event.target;
    const letter = input.value.toLowerCase();
    const index = input.dataset.index;

    if (letter === "") return; // Ignore if input is empty (backspace handling)

    if (letter === word[index]) {
        input.style.color = "green";
        input.disabled = true;
    } else if (!guessedLetters.includes(letter)) {
        input.style.color = "red";
        guessedLetters.push(letter);
        mistakes.textContent = guessedLetters.join(', ');

        if (triesLeft > 0) {
            triesLeft--;
            tries.textContent = triesLeft;
            trySymbols[5 - triesLeft - 1].classList.add("circle-done");
        }
    }

    if (triesLeft === 0) {
        alert("You ran out of tries! Try again.");
        resetGame();
    } else if (Array.from(inputBoxes.querySelectorAll("input")).every(input => input.disabled)) {
        alert("You guessed the word! Congratulations!");
        resetGame();
    }
}

function resetGame() {
    guessedLetters = [];
    mistakes.textContent = "";
    triesLeft = 5;
    tries.textContent = triesLeft;
    trySymbols.forEach(circle => circle.classList.remove("circle-done"));
    
    inputBoxes.querySelectorAll("input").forEach(input => {
        input.value = "";
        input.style.color = "";
        input.disabled = false;
    })

    getWord();
}

function resetGameOnRandom() {
    resetGame();
    getWord()
}

form.addEventListener("input", checkLetter);
random.addEventListener("click", resetGameOnRandom)
reset.addEventListener("click", resetGame)

getWord()
createScramblleWord(word);


