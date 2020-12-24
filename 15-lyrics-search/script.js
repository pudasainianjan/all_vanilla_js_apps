const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = 'https://api.lyrics.ovh';

//*seach by song orr artists
async function searchSongs(term){
  //*Fetching without async await
  // fetch(`${apiURL}/suggest/${term}`).then(res=>res.json())
  // .then(data=>console.log(data));

  //*Fetching with async await is more cleaner
  const res =  await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();

  // console.log(data);
  showData(data);
}

// * Show song and atist in DOM
function showData(data){
  let output = '';
  data.data.forEach(song => {  //*note we can also add these  output directly to result by mapping and joining istead of foreach
    output += `
      <li>
        <span><strong>${song.artist.name}</strong>-${song.title}</span>
        <button class="btn" data-artist="${song.artist.name}"
        data-songtitle="${song.title}">Add Lyrics</button>
      </li>
    `;
    result.innerHTML = `
      <ul class="songs">
        ${output}
      </ul>
    `;
  });

  if(data.prev || data.next){
    more.innerHTML = `
      ${data.prev? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`:''}  
      ${data.next? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`:''}  
    `;
  }
  else{
    more.innerHTML ='';
  }
}

//* Get prev and next rersults/songs
async function getMoreSongs(url){
  //*Fetching with async await is more cleaner
  const res =  await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  
  showData(data);
}

//*Event Listeners
form.addEventListener('submit',e=>{
  e.preventDefault();

  const searchTerm = search.value.trim();
  if(!searchTerm){
    alert('Please Type In A Search Term...');
  }
  else{
    searchSongs(searchTerm);
  }
});

//* Get lyrics for song
async function getLyrics(artist,songTitle){
  const res =  await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g,'<br>');  //search for return or newline
  console.log(lyrics);
  result.innerHTML = `<h2><stong>${artist}</strong>- ${songTitle}</h2>
    <span>${lyrics}</span>
  `;
  more.innerHTML='';
}

//* Get Lyrics button click
result.addEventListener('click',e=>{
  const clickedEl = e.target;
  if(clickedEl.tagName === 'BUTTON'){
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');

    getLyrics(artist,songTitle);
  }

});

