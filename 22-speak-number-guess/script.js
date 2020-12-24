const msgEl = document.getElementById('msg');
const randomNum = getRandomNumber();

console.log('Number',randomNum);

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;  //some brorwsers may not support SpeechRecognition as this is in experimental phase

let recognition = new window.SpeechRecognition();

//* start recognition and game
recognition.start();

//*capture user speak
function onSpeak(e){
  // console.log(e);
  const msg = e.results[0][0].transcript;
  
  writeMessage(msg);
  checkNumber(msg);
}

//*Write what user speaks
function writeMessage(msg){
  msgEl.innerHTML = `
    <div>You Said: </div>
    <span class="box">${msg}</box>
  `;
}

//* Check message agianst number
function checkNumber(msg){
  const num = +msg;

  //check if its valid number
  if(Number.isNaN(num)){
    msgEl.innerHTML += '<div>That is not a valid number</div>'
    return;
  }

  //*check in range
  if(num>100 || num<1){
    msgEl.innerHTML += '<div>Number must be between 1 and 100</div>'
    return;
  }

  ///*check number
  if(num===randomNum){
    document.body.innerHTML =`
      <h2>Congrats! You have guessed a number!<br><br>
      It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>
    `;
  }
  else if(num>randomNum){
    msgEl.innerHTML += '<div>Go Lower</div>';
  }
  else{
    msgEl.innerHTML += '<div>Go Higher</div>';

  }
}

//* Generate random number
function getRandomNumber(){
  return Math.floor(Math.random()*100)+1;
}

//* Speak result 
recognition.addEventListener('result',onSpeak);

//*End SR sevice
recognition.addEventListener('end',()=>recognition.start());

document.body.addEventListener('click',e=>{
  if(e.target.id ==='play-again') window.location.reload();
});