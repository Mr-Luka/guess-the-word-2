const scramblleWord = document.querySelector("#scramblle-word");
const tries = document.querySelector("#span-tries");
const triesSymbol = document.querySelector("p#tries");
const mistakes = document.querySelector("#span-mistakes");
const input = document.querySelectorAll("input");

const random = document.querySelector("#random");
const reset = document.querySelector("#reset");

let word = "flower"
let guessedLetters = [];
let triesLeft = 5;


const getWord = async function () {
    const response = await fetch (`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const data = await response.text();
    const wordArray = data.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    createScramblleWord(word);
}


function createScramblleWord(word) {
    scramblleWord.innerHTML = "";
    for (let letter of word) {
        const p = document.createElement("p");
        p.classList.add("scramblle");
        p.textContent = letter;
        scramblleWord.appendChild(p)
    }
}
createScramblleWord(word);


random.addEventListener("click", getWord)
