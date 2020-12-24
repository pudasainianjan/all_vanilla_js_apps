const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const moneyImg = document.querySelector('img');
console.log(moneyImg);

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');


//*fetch exchange rates and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;
  fetch(`https://v6.exchangerate-api.com/v6/5ab1a790a8f07847fc68bdae/latest/${currency_one}`)
    .then(res => res.json())
      .then(data => {
        // console.log(data);
        const rate = data.conversion_rates[currency_two];
        rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
      });

      //rotate image when requested
      moneyImg.style.transition = "transform 2s";
      if(Math.floor(Math.random() * 100) % 2 === 0){
        
        moneyImg.style.transform = 'rotate(180deg)';
      }
      else{
        moneyImg.style.transform = 'rotate(-180deg)';
      }

      
}

//*Event Listeners
currencyEl_one.addEventListener('change',calculate);
amountEl_one.addEventListener('input',calculate);
currencyEl_two.addEventListener('change',calculate);
amountEl_two.addEventListener('change',calculate);

swap.addEventListener('click', ()=>{
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
})

calculate();
