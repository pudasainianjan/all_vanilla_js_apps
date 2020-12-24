let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
    //clear any existing timers
    clearInterval(countdown);
    const now = Date.now();  //timestamp in ms
    const then = now + seconds *1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(()=>{   //this doesnt run immediately,this waits for first sec in this case
        const secondsLeft = Math.round((then - Date.now())/1000); 
        //check if we need to stop it
        if(secondsLeft<0){
            // return;//just doing return only wont stop interval ,just runs but not show us anything
            clearInterval(countdown);
            return;
        }
        //display it
        displayTimeLeft(secondsLeft);
    },1000);
}

function displayTimeLeft(seconds){
    const mins = Math.floor(seconds/60);
    const remainderSeconds = seconds % 60;
    const display = `${mins}:${remainderSeconds<10?"0":""}${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
    // console.log(mins,remainderSeconds);
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);  //convert to timestamp
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour>12?hour-12:hour}:${minutes<10?'0':''}${minutes}`;
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button=>button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins*60)
    this.reset();
});