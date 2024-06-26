const scramblleWord = document.querySelector("#scramblle-word");
const tries = document.querySelector("#span-tries");
const triesSymbol = document.querySelector("p#tries");
const mistakes = document.querySelector("#span-mistakes");
const input = document.querySelectorAll("input");
const inputBoxes = document.querySelector(".word-letters");
const pScramble = document.querySelector(".scramblle");


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
    scrambleTheWord(word)
}

const scrambleTheWord = (word) => {
    const separateLetters = word.split("");
    const scrambledWord = separateLetters.sort(() => Math.random() - 0.5).join(' ');
    pScramble.textContent = scrambledWord;
}




function createScramblleWord(word) {
    scramblleWord.innerHTML = "";
    pScramble.textContent = word;
    scramblleWord.appendChild(pScramble)        
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



getWord()
createScramblleWord(word);

random.addEventListener("click", getWord)

