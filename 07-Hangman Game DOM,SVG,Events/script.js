const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application','programming','interface','wizard'];

let selectedWord = words[Math.floor(Math.random()*words.length)];
// console.log(selectedWord.split(''));

const correctLetters = [];
const wrongLetters = [];

//*Show the hidden word
function displayWord(){
    //splitting word into letter and keeping to array
    wordEl.innerHTML = `
        ${selectedWord
        .split('')
        .map(letter=>
            `<span class ="letter">${correctLetters.includes(letter)?letter:''}</span>`
        ).join('')  //join because map returns array so turning back to STRING
    }
    `;
    const innerWord = wordEl.innerText.replace(/\n/g,'');    //replace new line character by empty string
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations! You won!😃';
        popup.style.display = 'flex';
    }
}

//*Update the wrong letters
function updateWrongLettersEl(){
    //display wrong letters
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length>0?'<p>Wrong</p>':''}
    ${wrongLetters.map(letter=>`<span>${letter}</span>`)}
    `;
    //display parts
    figureParts.forEach((part,index)=>{
        const errors = wrongLetters.length;

        if(index<errors){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }
    });
    //check if lost
    if(wrongLetters.length === figureParts.length){
        finalMessage.innerText = 'Unfortunately you lost.😢';
        popup.style.display = 'flex';
    }
    
}

//*Show notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(()=>{
    notification.classList.remove('show');
    },2000)
}

//keydown letter press
window.addEventListener('keydown',e=>{
    // console.log(e.keyCode);
    if(e.keyCode >= 65 && e.keyCode<=90){       //checking if letter is entered
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }
            else{
                showNotification();
            }
        }
        else{
            if(!wrongLetters.includes(letter)){
                wrongLetters.push(letter);
                updateWrongLettersEl();
            }
            else{
                showNotification();
            }
        }
    }
});

//restart game and play again 
playAgainBtn.addEventListener('click',()=>{
    //empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random()*words.length)];
    displayWord();
    updateWrongLettersEl();
    popup.style.display = 'none';
});


displayWord();