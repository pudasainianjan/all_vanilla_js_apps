const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

//* List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

//* Init word
let randomoWord;

//* Init score
let score=0;

//* Init time
let time = 10;

//* set difficulty to value in ls or medium
let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'):'medium';

//*set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty'):'medium';

//* focus on text on page start
text.focus();

//* start counting down
const timeInterval = setInterval(updateTime,1000);

//* Generate random word from aray
function getRandomWord(){
  return words[Math.floor(Math.random()*(words.length))];
}

//* Add word to DOM
function addWordToDom(){
  randomoWord = getRandomWord();
  word.innerHTML = randomoWord;
}
addWordToDom();


//* Update score
function updateScore(){
  score++;
  scoreEl.innerHTML = score;
}

//* Update time every secons
function updateTime(){
  time--;
  timeEl.innerHTML = time + 's';
  if(time === 0){
    clearInterval(timeInterval);

    //end game
    gameOver();
  }
}

//* game over show in screen 
function gameOver(){
  endgameEl.innerHTML = `
    <h1>Time Ran Out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

//* EVENT LISTENERS

//*Typing...
text.addEventListener('input',e=>{
  const insertedText = e.target.value;
  if(insertedText === randomoWord){
    addWordToDom();

    updateScore();
    //clear
    e.target.value ='';
    
    if(difficulty === 'hard'){
    time += 2;
    }
    else if(difficulty === 'medium'){
    time += 3;
    }
    else{
    time += 5;
    }

    updateTime();
  }
});

//* Settings btn click
settingsBtn.addEventListener('click',()=> settings.classList.toggle('hide'));

//* settings select
settingsForm.addEventListener('change',e=>{
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem('difficulty',difficulty);
});


