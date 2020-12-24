const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//*Play & pause video
function toggleVideoStatus(){
    if(video.paused){       //since video is connected with html video we have certain property (api) like video.paused
        video.play();
    }
    else{
        video.pause();
    }
}

//*update play pause icon
function updatePlayIcon(){
    if(video.paused){
        play.innerHTML ='<i class="fa fa-play fa-2x"></i>';
    }
    else{
        play.innerHTML ='<i class="fa fa-pause fa-2x"></i>';
    }
}

//*update progress and timestamp
function updateProgress(){
    // console.log(video.currentTime);
    // console.log(video.duration);
    progress.value = (video.currentTime / video.duration) * 100;  //constantly getting percentage

    //*get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins<10){
        mins = '0' + String(mins);
    }

    //*get seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs<10){
        secs = '0' + String(secs);
    }

    timestamp.innerHTML = `${mins}:${secs}`;
}

//*set video time to progress
function setVideoProgress(){
    video.currentTime = (+progress.value * video.duration)/100;
    // console.log(progress.value);
}

//* stop the video
function stopVideo(){
    video.currentTime = 0;
    video.pause();
}


//*Event listeners
video.addEventListener('click',toggleVideoStatus);
video.addEventListener('pause',updatePlayIcon);
video.addEventListener('play',updatePlayIcon);
video.addEventListener('timeupdate',updateProgress);  //*as videeo plays continuously calls time update to get time

play.addEventListener('click',toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);