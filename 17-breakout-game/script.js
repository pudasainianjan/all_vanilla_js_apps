const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx= canvas.getContext('2d'); //canvas rerndering context 2d inteface --> allows us to draw shapes in canvas like rectangle

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

//create ball props
const ball = {
  x: canvas.width /2, //ball is centered hoizontally
  y:canvas.height/2,
  size:10,  //radius of ball
  speed:4,
  dx:4,
  dy:-4
};

//*create paddle porps
const paddle = {
  x: canvas.width/2 -40,
  y:canvas.height - 20,
  w:80,
  h:10,
  speed:8,
  dx:0
};

//*Create bricks props
const brickInfo = {
  w:70,
  h:20,
  padding:10,
  offsetX:45,     //*position of the brick on the x-axis
  offsetY:60,
  visible:true
}

//* Cerate bricls
const bricks = [];
for(let i=0; i<brickRowCount; i++){
  bricks[i] =[];
  for(let j=0; j<brickColumnCount; j++){
    const x = i*(brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j*(brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = {x,y,...brickInfo};
  }
}


//*draw a ball on canvas

function drawBall(){
  ctx.beginPath();    //begin canvas path
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2); // Outer circle
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();    //close canvas path
}

//*Draw paddle on canvas
function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddle.x,paddle.y,paddle.w,paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}


//* Draw score on canvas
function drawScore(){
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, canvas.width-100,30);
}

//*Draw bricks on canvas
function drawBricks(){
  bricks.forEach(column=>{
    column.forEach(brick=>{
      ctx.beginPath();
      ctx.rect(brick.x,brick.y,brick.w,brick.h);
      ctx.fillStyle = brick.visible?'#0095dd':'transparent';
      ctx.fill();
      ctx.closePath();
    })
  });
}

//* Move paddle on canvas
function movePaddle(){
  paddle.x += paddle.dx;

  //* wall detection 
  if(paddle.x + paddle.w> canvas.width){
    paddle.x = canvas.width - paddle.w;
  }
  if(paddle.x<0){
    paddle.x =0;
  }
}

//* Move ball on canvas
function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;

  //wall collison(right/left)
  if(ball.x+ball.size >canvas.width || ball.x-ball.size<0){
    ball.dx *= -1;  
  }

  //wall collison(top/bottom)
  if(ball.y+ball.size >canvas.height || ball.y-ball.size<0){
    ball.dy *= -1;  
  }

  //* paddle collision
  if(ball.x - ball.size > paddle.x && ball.x +ball.size <paddle.x +paddle.w && ball.y + ball.size >paddle.y){
    ball.dy = -ball.speed;
  }

  //*Bick collision
  bricks.forEach(column=>{
    column.forEach(brick => {
      if(brick.visible){
        if(
            ball.x - ball.size > brick.x && // left brick side check
            ball.x + ball.size < brick.x + brick.w && // right brick side check
            ball.y + ball.size > brick.y && // top brick side check
            ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ){
          ball.dy *=-1;
          brick.visible =false;

          increaseScore();
        }
      }
    });
  })

  //hit bottom wall loose
  if(ball.y + ball.size > canvas.height){
    showAllBricks();
    score =0;
  }
}

//*Incresae Score
function increaseScore(){
  score++;

  if(score % (brickRowCount*brickRowCount) === 0){
    showAllBricks();
  }
}

//*make all bricks appear
function showAllBricks(){
  bricks.forEach(column=>{
    column.forEach(brick=>brick.visible =true);
  })
}

//*Draw everything
function draw(){
  //*Clearr canvas so that updates do not overlap
  ctx.clearRect(0,0,canvas.width,canvas.height)
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}


//*update canvas drawing and animation
function update(){
  movePaddle();
  moveBall();
  //draw everything
  draw();

  requestAnimationFrame(update);
}
update();
//* Keydown event 
function keyDown(e){
  // console.log(e.key);
  if(e.key === 'Right' || e.key === 'ArrowRight'){
    paddle.dx = paddle.speed;
  }
  else if(e.key==='Left'||e.key==='ArrowLeft'){
    paddle.dx = -paddle.speed;
  }
}

//*KeyUp event
function keyUp(e){
  if(e.key === 'Right' || e.key === 'ArrowRight' || e.key==='Left'||e.key==='ArrowLeft'){
    paddle.dx = 0;
  }
}


//*keyboard event handlers
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

//* Rules and close event handlers
rulesBtn.addEventListener('click',()=>rules.classList.add('show'));

closeBtn.addEventListener('click',()=>rules.classList.remove('show'));


