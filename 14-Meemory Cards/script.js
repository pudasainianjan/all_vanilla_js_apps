const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');


//*keep track of curreent card
let curreentActiveCard = 0;

//* Store DOM cards
const cardsEl = [];

// //* store card data
// const cardsData = [
//     {
//       question: 'What must a variable begin with?',
//       answer: 'A letter, $ or _'
//     },
//     {
//       question: 'What is a variable?',
//       answer: 'Container for a piece of data'
//     },
//     {
//       question: 'Example of Case Sensitive Variable',
//       answer: 'thisIsAVariable'
//     }
//   ];
const cardsData = getCardsData();

  //* Create all cards
  function createCards(){
      cardsData.forEach((data,index)=>createCard(data,index));
  }
  
  //* Create a single card in the DOM
  function createCard(data,index){
    const card = document.createElement('div');
    card.classList.add('card');
    console.log(index);
    if (index === 0){
        card.classList.add('active');
    }

    card.innerHTML = `
        <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${data.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${data.answer}
            </p>
          </div>
        </div>
    `;

    card.addEventListener('click',()=> card.classList.toggle('show-answer'))

    //* Add to DOM cards
    cardsEl.push(card);

    cardsContainer.appendChild(card);

    updateCurrentText();
  }

  //*show number of cards
  function updateCurrentText(){
    currentEl.innerText = `${curreentActiveCard+1} / ${cardsEl.length}`
  }

  //* Get cards from localstorage
  function getCardsData(){
      const cards = JSON.parse(localStorage.getItem('cards'));
      return cards === null ? [] : cards;
  }

  //*add card to local storage
  function setCardsData(cards){
      localStorage.setItem('cards',JSON.stringify(cards));
      window.location.reload;
  }

  createCards();

  //*Event Listeners

  nextBtn.addEventListener('click',()=>{
    cardsEl[curreentActiveCard].className = 'card left';

    curreentActiveCard = curreentActiveCard + 1;
    if(curreentActiveCard > cardsEl.length-1){
        curreentActiveCard = cardsEl.length-1;
    }
    cardsEl[curreentActiveCard].className = 'card active';
    updateCurrentText();
  });

  //*Next card button
  prevBtn.addEventListener('click',()=>{
    cardsEl[curreentActiveCard].className = 'card right';

    curreentActiveCard = curreentActiveCard - 1;
    if(curreentActiveCard < 0){
        curreentActiveCard = 0;
    }
    cardsEl[curreentActiveCard].className = 'card active';
    updateCurrentText();
  });

  //*show and hide add container
  showBtn.addEventListener('click',()=>addContainer.classList.add('show'));
  hideBtn.addEventListener('click',()=>addContainer.classList.remove('show'));

  //*add new card
  addCardBtn.addEventListener('click',()=>{
    const question = questionEl.value.trim();
    const answer = answerEl.value.trim();
    if(question && answer){
        const newCard = {question,answer};

        cardsData.length === 0? createCard(newCard,0):createCard(newCard);
        questionEl.value ='';
        answerEl.value ='';

        addContainer.classList.remove('show');

        cardsData.push(newCard);

        setCardsData(cardsData);  //* to localstorrage
    }
  });

  //*clear cards button
  clearBtn.addEventListener('click',()=>{
    localStorage.clear();
    cardsContainer.innerHTML ='';
    window.location.reload();
  });
  console.log(cardsData.length);
 
  


