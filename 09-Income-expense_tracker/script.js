const balance  = document.getElementById('balance')
const money_plus  = document.getElementById('money-plus')
const money_minus  = document.getElementById('money-minus')
const list  = document.getElementById('list')
const form  = document.getElementById('form')
const text  = document.getElementById('text')
const amount  = document.getElementById('amount')

// const dummyTransactions = [
//     { id:1, text:'Flower', amount:-20},
//     { id:2, text:'Salary', amount:300},
//     { id:3, text:'Book', amount:-10},
//     { id:4, text:'Camera', amount:150},
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions:[];

//*Add tansaction 
function addTransaction(e){
    e.preventDefault();
    if(text.value.trim() === '' || amount.value.trim() ===''){
        alert('Please add a text and amount');
    }
    else{
        const transaction = {
            id:generateID(),
            text:text.value,
            amount: +amount.value
        }
        
        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorarge();
        text.value = '';
        amount.value = '';
    }
}

//*Generrate rarndom ID
function generateID(){
    return Math.floor(Math.random()*100000000)
}


//*Add Transions to the DOM list
function addTransactionDOM(transaction){
    //Get sign
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //Add class based on value
    item.classList.add(transaction.amount < 0? 'minus':'plus');

    item.innerHTML = `
        ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(
        ${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

//*Update the balance income and expense
function updateValues(){
    const amounts = transactions.map(transaction=>transaction.amount);
    const total = amounts.reduce((acc,curr)=>acc+=curr,0).toFixed(2);
    // console.log(typeof parseInt(total));

    const income = amounts
        .filter(item => item > 0)  //means income
        .reduce((acc,filteredIncome) => acc+=filteredIncome,0)
        .toFixed(2);
    
    const expense = (amounts
        .filter(item=>item<0)
        .reduce((acc,filteredExpense)=>acc+=filteredExpense,0) * -1)
        .toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;

        
    

}

//*Remove tansaction by ID
function removeTransaction(id){
    transactions = transactions.filter(transaction=> transaction.id !== id);
    updateLocalStorarge();
    init();
}

//*Update local storagee trransaction
function updateLocalStorarge(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}

//Init App

function init(){
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

init();

form.addEventListener('submit',addTransaction);