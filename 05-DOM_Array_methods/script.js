const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaresBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [        //all the people
    
];

getRandomUser();
getRandomUser();
getRandomUser();

//*fetch random user and add money
async function getRandomUser(){  //because async returns promise
    // fetch('https://randomuser.me/api').then(res=>res.json())
    // .then(data=>{
    //     console.log(data);
    // })
    //*using async await instead of above code to get data so make this func async above to use
    const res = await fetch('https://randomuser.me/api');  //wait until fetch finishes
    const data = await res.json();    //this returns promise also so we await
    
    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random()*1000000)
    };
    addData(newUser);
}

function addData(obj){
    data.push(obj);
    updateDOM();
}

//function run paisa double (MAP)
function doubleMoney(){
    data = data.map(user=>{
        return { ... user, money:user.money*2}; 
    });
    updateDOM();
}

//*Sort by richest users
function sortByRichest(){
    data.sort((a,b)=>b.money-a.money);       //cant do just b-a here because they r objects not single numbers
    updateDOM();
}

//*filter only millionares
const showMillionares = ()=>{
    data = data.filter((user)=> user.money >= 1000000);
    updateDOM();
}

//*calculate wealth(total wealth of all users)
function calculateWealth(){
    const wealth = data.reduce((acc,user)=>acc+user.money,0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong>`;
    main.appendChild(wealthEl);
}

//?update DOM    (FOREACH Method)
function updateDOM(providedData = data){      //giving default data if not provided any data
    //clear the main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach( item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
}

//*format number as money
function formatMoney(number){
    return '$'+(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}



//*Event listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
sortBtn.addEventListener('click',sortByRichest);
showMillionaresBtn.addEventListener('click',showMillionares);
calculateWealthBtn.addEventListener('click',calculateWealth);


//PRACTICING ARRAY METHODS

//todo: how to sort array demo
// const arr = [1,2,110,3,4,330]
// const sortedArr = arr.sort((a,b)=>a-b);   //! note only sort will sort by seeing ones digit position  only so do this way
// console.log(sortedArr);

//todo filter method demo
// const arr1 = [20,23,25,30,21,50,60];
// const under30 = arr1.filter(item=>{
//     return item<30;
// });
// console.log(arr1);
// console.log(under30);


//todo Array Reduce Method --> calculating total
const arr3 = [1,2,3,4,5];
const total = arr3.reduce((acc,num)=>{ //takes accumulator and number
    return acc+num;
},0);   //begin acc with 0
console.log(total);
