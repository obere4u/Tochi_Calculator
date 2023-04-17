
// Calculator App designed by Nwosa Tochukwu on 4/13/2023

// Selectors
const calculatorContainer = document.querySelector(".calculator-wrapper");
const calculatorScreen = document.querySelector('.calculator-screen .screen-display');
const keyButtons = document.querySelector(".calculator-keys");
const addButton = document.querySelector(".addition");

const resetButton = document.querySelector('.clear');



//Event Listeners

keyButtons.addEventListener("click", e => {
    if (e.target.matches('button')) {
      const keyButton = e.target;
      const action = keyButton.dataset.action;
      const displayedKey = keyButton.textContent;
      const displayedNum = calculatorScreen.textContent;
      const previousKeyType = calculatorContainer.dataset.previousKeyType;


      if (!action) {
          // clearCalculatorScreen();
        if (previousKeyType === "calculate") {
        clearCalculatorScreen();
        }

        if (displayedNum === "0" || displayedNum === "operator" || previousKeyType === "clear") {
          calculatorScreen.textContent = displayedKey; //changes the displayed number to the key-value clicked
        } else {
          if (previousKeyType === "operator") {
            calculatorScreen.textContent =
              displayedNum.slice(0, -1) + displayedKey;
          } else {
            calculatorScreen.textContent += displayedKey;
          }
          calculatorContainer.dataset.previousKeyType = "number"; //sets the previousKeyTyped to number
        }
        calculatorContainer.dataset.previousKey = "number";
      } 
      
      if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide"
            ) {
            calculatorScreen.textContent = displayedKey;
            // If the previous key type was an operator, replace it with the new operator
            if(previousKeyType === "operator") {
                calculatorContainer.dataset.operator = action;
                return;
            }
            calculatorContainer.dataset.previousKeyType = "operator";
            const indexOfOperator = displayedNum.search(/[+\-*/]/); //uses regExp to search for all operator characters in the displayed value

            if (indexOfOperator !== -1) {
                //checks if an operator is found in the displayed number and if it is found, set all numbers before it to firstValue
                calculatorContainer.dataset.firstValue = displayedNum.slice(0, indexOfOperator);
            } else {
                //else if no operator is found, set all displayed number as first value
                calculatorContainer.dataset.firstValue = displayedNum;
                
            }
            
            calculatorContainer.dataset.operator = action;
            calculatorContainer.dataset.previousKeyType = "operator";
            
        }
      
        if (action === "decimal") {

          if (!displayedNum.includes(".")) {
            //checks if the displayed value on screen contains decimal or not
              calculatorScreen.textContent += ".";
            }
            calculatorContainer.dataset.previousKeyType = "decimal";        
        }
        
        if (action === "calculate") {
            const firstValue = parseFloat(calculatorContainer.dataset.firstValue); //gets the first value 
            const secondValue = parseFloat(displayedNum); //gets the second value and parseFloat converts it from string to integer. we can as well use parseInt but because we will be dealing with decimal points, parseFloat is the best to use in both firstValue and secondValue scenario


            let result = 0;
            
            switch (calculatorContainer.dataset.operator) {
              case "add":
                result = firstValue + secondValue;
                break;

              case "subtract":
                result = firstValue - secondValue;
                break;

              case "divide":
                result = firstValue / secondValue;
                break;

              case "multiply":
                result = firstValue * secondValue;
                break;

              default:
                return;
            }
            console.log(result);
            calculatorContainer.dataset.previousKeyType = "calculate"; //so that it can remember the last operator key pressed/used
            calculatorScreen.dataset.firstValue = result; //firstValue is assigned the result value so that the result can be displayed or use for further calculation
            calculatorScreen.textContent = result; //displays the content of the result
        }

        if (action === "clear") {
            calculatorScreen.textContent = "0";
            calculatorContainer.dataset.firstValue = "";
            calculatorContainer.dataset.operator = "";
        }

        
    }
    
    function clearCalculatorScreen() {
        // const previousKeyType = calculatorContainer.dataset.previousKeyType;
        calculatorScreen.textContent = "";
        // calculatorContainer.dataset.previousKeyType = "clear";
        // calculatorContainer.dataset.firstValue = "";
        // calculatorContainer.dataset.operator = "";
        
    }
    
})
