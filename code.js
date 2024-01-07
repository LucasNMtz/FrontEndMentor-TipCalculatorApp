const errorMsg = document.querySelector(".input-zero-error-msg");
const inputs = document.querySelectorAll("input");
const resetBtn = document.querySelector(".reset-button");
const tipAmountSpan = document.querySelector(".tip-amount-span");
const totalSpan = document.querySelector(".total-span");
const tipButton = document.querySelectorAll(".tip-button");
let bill = 0;
let percentage = 0;
let people = 0;

inputs[2].addEventListener("input", () => {
    if (inputs[2].value === "0") {
        errorMsg.style.display = "block";
        inputs[2].style.outlineColor = "var(--Red)";
    } else {
        errorMsg.style.display = "none";
        inputs[2].style.outlineColor = "var(--Strong-cyan)";
    }
})

inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
        bill = inputs[0].value.trim();
        if(index === 1 && !isNaN(input.value)){
            percentage = inputs[1].value.trim();
            tipButton.forEach(button => { button.classList.remove("tip-button-active"); })
        }
        people = inputs[2].value.trim();
        filterLetters(input);
        verifyInputs(bill, percentage, people);
        calculateAndUpdate(bill, percentage, people);
    })
})

tipButton.forEach(button => {
    button.addEventListener("click", () => {
        inputs[1].value = "";
        tipButton.forEach(button => { button.classList.remove("tip-button-active"); })
        button.classList.add("tip-button-active");
        bill = inputs[0].value.trim();
        percentage = button.textContent.replace("%", "");
        people = inputs[2].value.trim();
        verifyInputs(bill, percentage, people);
        calculateAndUpdate(bill, percentage, people);
    })
})

resetBtn.addEventListener("click", ()=>{
    tipButton.forEach(button => { button.classList.remove("tip-button-active"); })
    inputs.forEach(input =>{
        input.value = "";
    })
    percentage = 0;
    bill = 0;
    people = 0;
    tipAmountSpan.textContent = "$0.00";
    totalSpan.textContent = "$0.00";
})

function filterLetters(input) {
    let inputValue = input.value;
    let newValue = inputValue.replace(/\D/g, '');
    input.value = newValue;
}

function verifyInputs(inputValueA, inputValueB, inputValueC){
    if (inputValueA !== '' || inputValueB !== '' || inputValueC !== '') resetBtn.classList.remove("reset-button-inactive");
    else resetBtn.classList.add("reset-button-inactive");
}

function calculateAndUpdate(bill, percentage, people){
    bill = parseFloat(bill);
    percentage = parseFloat(percentage);
    people = parseFloat(people);
    let tipAmount = 0;
    let total = 0;
    if(people === 0){
        tipAmountSpan.textContent = "$0.00";
        totalSpan.textContent = "$0.00";
    }
    else{
        if (people && !isNaN(people)){
            tipAmount = Number(((percentage / 100) * bill) / people);
            total = Number(bill / people);
        }
        if(tipAmount === 0 ||  isNaN(tipAmount)) tipAmountSpan.textContent = "$0.00";
        else tipAmountSpan.textContent = `$${tipAmount.toFixed(2)}`;
        if(total === 0 || isNaN(total)) totalSpan.textContent = "$0.00";
        else totalSpan.textContent = `$${total.toFixed(2)}`;
    }
}