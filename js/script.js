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


// random.addEventListener("click", mainWord);
