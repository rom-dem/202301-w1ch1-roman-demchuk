let displayScreen = document.querySelector(".display");
let numberButtons = document.querySelectorAll(".number-buttons");
let operatorButtons = document.querySelectorAll(".operator-buttons .operator");
let sqrtButton = document.querySelector(".operator-buttons .sqrt");
let clearOne = document.querySelector(".operator-buttons .clear-one");
let clearAll = document.querySelector(".operator-buttons .clear-all");
let equals = document.querySelector(".operator-buttons .equals");
let restart = false;
let onePoint = false;
let zeroPoint = false;


numberButtons.forEach( (button) => {
    button.addEventListener("click", (event) => {
        let value = event.target.value
        if (restart){
            displayScreen.value = '';
            restart = false;
        };
        if ((displayScreen.value.includes("+0") || displayScreen.value.includes("-0") || displayScreen.value.includes("*0") || displayScreen.value.includes("/0")) && value == "0" && !zeroPoint && !onePoint){
            displayScreen.value += ".";
            onePoint = true;
            zeroPoint = true;
            return;
        };
        if (onePoint && value == "."){
            return;
        };
        if (value == "."){
            onePoint = true;
        }
        if (displayScreen.value == "0" && value == "0"){
            return;
        }
        displayScreen.value += value
    });
});

operatorButtons.forEach( (button) => {
    button.addEventListener("click", (event) => {
        restart = false;
        onePoint = false;
        
        if((displayScreen.value.includes("-", 1) || displayScreen.value.includes("+") || displayScreen.value.includes("*") || displayScreen.value.includes("/")) && displayScreen.value.length > 2){
            let result = eval(displayScreen.value);
            displayScreen.value = result;
        };

        
        if(displayScreen.value.includes("-", 1) || displayScreen.value.includes("+") || displayScreen.value.includes("*") || displayScreen.value.includes("/")){
            return;
        };

       
        if (restart){
            displayScreen.value = '';
            restart = false;
        } 
        let value = event.target.value;
        displayScreen.value += value;
    });
});

equals.addEventListener("click", () => {
    if(displayScreen.value === NaN ||displayScreen.value === "" || displayScreen.value === "👿Error👿"){
        return;
    } else if (restart){
        displayScreen.value = '';
        restart = false;
    } else {
        let result = eval(displayScreen.value);
        displayScreen.value = result;
        restart = true;
        onePoint = false;
        zeroPoint = false;
        if(displayScreen.value === "Infinity" || displayScreen.value === "-Infinity" || displayScreen.value === "NaN") {
            displayScreen.value = "👿Error👿";
            restart = true;
            onePoint = false;
            zeroPoint = false;
        }; 
};
});

sqrtButton.addEventListener("click", () => {
    if (displayScreen.value < 0) {
        displayScreen.value = "👿Error👿";
        restart = true;
        onePoint = false;
        zeroPoint = false;
    } else { 
    let result = Math.sqrt(displayScreen.value);
    displayScreen.value = result;
    restart = true;
    onePoint = false;
    if(displayScreen.value === "Infinity" || displayScreen.value === "NaN") {
            displayScreen.value = "👿Error👿";
            restart = true;
            onePoint = false;
            zeroPoint = false;
    };
};
});

clearAll.addEventListener("click", () => {
    displayScreen.value = "";
    onePoint = false;
    zeroPoint = false;
});

clearOne.addEventListener("click", () =>{
    if(displayScreen.value === "undefined" || displayScreen.value === "👿Error👿") {
        displayScreen.value = "";
        onePoint = false;
        zeroPoint = false;
    } else { 
    displayScreen.value = displayScreen.value.slice(0, -1);
    };
});



