const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


//show input error message
function showError(input,message){
    const formControl = input.parentElement;  //becasue we placed error in formcontrol div
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//show success outline
function showSuccess(input){
    const formControl = input.parentElement;
    formControl.className = 'form-control success';     // formControl.classList.add('success')  // formControl.classList.remove('error');
}

//check email is valid
function checkEmail(input){  /*js email regex stackoverflow*/
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(re.test(input.value.trim())){
        showSuccess(input);
    }
    else{
        showError(input,'Email is not valid')
    }
}

//check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){  //trim cuts white spaces
            showError(input, `${getFieldName(input)} is required`);
        }
        else{
            showSuccess(input);
        }
    });
}

//check input length
function checkLength(input,min,max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    }
    else if(input.value.length > max){
        showError(input,`${getFieldName(input)} must be less than ${max} characters`)
    }
    else{
        showSuccess(input);
    }
}

//check passwords match
function checkPasswordsMatch(input1,input2){
    if(input1.value.trim() !== input2.value.trim()){
        showError(input2,'Passwords do not match');
    }
}

//get fieldname
function getFieldName(input){
    //TODO: uppercases first letter and return
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listeners
form.addEventListener('submit',function(e){
    e.preventDefault();     //e has preventDefault method
    
    checkRequired([username,email,password,password2]);
    checkLength(username,3,15);
    checkLength(password,6,25);
    checkEmail(email);
    checkPasswordsMatch(password,password2);
});









