const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})  //this returns a promise
        .then(localMediaStream=>{
            // console.log(localMediaStream);
            video.srcObject = localMediaStream;           
            video.play();
            console.log(video.srcObject);
        })
        .catch(err=>{
            alert('Hey! you denied the webcam!',err);
            console.error('Hey! you denied the webcam!',err)
        })
     
}

function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    // console.log(width,height);
    //*make sure canvas have same size as your webcam video
    canvas.width = width;
    canvas.height = height;

    //every 16ms we r going to take image from the webcam put it into the canvas
    return setInterval(()=>{        //returned because we can clear inteval access later
        ctx.drawImage(video,0,0,width,height); //start at the top left corner of canvas and paint width and height
        //take the img pixels out
        let pixels = ctx.getImageData(0,0,width,height);        //this pixel can be of 1.2 million array size so it is special kind of array so may not have some mothods like map
        //console.log(pixels);        //may give millions of data so pause by debugger at certain time  returns array 0:red 1:green 2:blue 3:alpha in every array
        // debugger;    
        //messing with pixels    
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        // pixels = greenScreen(pixels);

        ctx.globalAlpha = 0.9;
        //put them back
        ctx.putImageData(pixels,0,0);
    },16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();
  
    // take the data out of the canvas
    const data = canvas.toDataURL('image/jpeg');
    // console.log(data);      //returns the base 64 -means the text based representation of the picture
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'myPhoto');
    link.innerHTML = `<img src="${data}" alt="Man" />`;
    strip.insertBefore(link, strip.firstChild);
  }

  function redEffect(pixels){
      for(let i=0;i<pixels.data.length; i+=4){       //loop over millions of array el
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED   channel
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN  channel
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue  channel
      }
      return pixels;
  }

  function rgbSplit(pixels){
    for(let i=0;i<pixels.data.length; i+=4){       //loop over millions of array el
        pixels.data[i - 200] = pixels.data[i + 0] + 100; // RED   channel
        pixels.data[i + 500] = pixels.data[i + 1] - 50; // GREEN  channel
        pixels.data[i - 150] = pixels.data[i + 2] * 0.5; // Blue  channel
      }
      return pixels;
  }

  function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }
  


getVideo();

video.addEventListener('canplay', paintToCanvas);   //once video is playing it canplay and we start to paint canvas



