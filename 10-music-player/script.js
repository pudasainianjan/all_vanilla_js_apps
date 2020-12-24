const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//*song titles
const songs = ['hey','summer','ukulele'];


//*keep track of song
let songIndex = 2;

//*initially load song details into DOM
loadSong(songs[songIndex]);

//*Update song details 
function loadSong(song){
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

//*Play song
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

//*Pause song
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

//*Previous song
function prevSong(){
    songIndex--;

    if(songIndex<0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//*next song
function nextSong(){
    songIndex++;

    if(songIndex>(songs.length-1)){
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//*Update progress
function updateProgress(e){
    // console.log(e.srcElement.currentTime);
    //destrurcturing
    const {duration, currentTime} = e.srcElement;
    // console.log(duration,currentTime);
    const progreessPerceent = (currentTime/duration)*100;
    progress.style.width = `${progreessPerceent}%`;

    
}

//* Set progrerss bar
function setProgress(e){
    const width = this.clientWidth;     //width of prrogreess containeer
    const clickX = e.offsetX;  //clicked width
    const duration = audio.duration;

    audio.currentTime = (clickX/width) * duration;
    
}

//*Event listeners 
playBtn.addEventListener('click',()=>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }
    else{
        playSong();
    }
});

//*chnagee song
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);

//*Time/song update
audio.addEventListener('timeupdate',updateProgress);

//*click on progress bar
progressContainer.addEventListener('click',setProgress);

//*Song ends
audio.addEventListener('ended',nextSong);

